<?php

namespace App\Twig\site;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Twig\Environment;
use Doctrine\Common\Collections\Criteria;

class TwigGlobalSubscriber implements EventSubscriberInterface
{

    /**
     * @var \Twig\Environment
     */
    private $twig;
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $em;

    public function __construct(Environment $twig, EntityManagerInterface $em)
    {
        $this->twig = $twig;
        $this->em = $em;
    }

    public function injectGlobalVariables()
    {
        //pages en ligne, non effacé et sans parents
        $criteria = new Criteria();
        $criteria->where(Criteria::expr()->neq('nom', 'accueil'));
        foreach (['etat' => 'en ligne', 'deletedAt' => null, 'parent' => null] as $key => $value)
            $criteria->andWhere(Criteria::expr()->eq($key, $value));
        $this->twig->addGlobal('pages', $this->em->getRepository('App:Temppage')->matching($criteria));
        //pages cercueils
        $this->twig->addGlobal('cercueils', $this->em->getRepository('App:Sitecercueil')->findBy(['deletedAt' => null]));
        //les pages
        $this->twig->addGlobal('service', $this->em->getRepository('App:Page')->findBy(['deletedAt' => null]));
        //le blog
        $pagesall = $this->em->getRepository('App:Temppage')->findBy(['etat' => 'en ligne', 'deletedAt' => null], ['updatedAt' => 'DESC']);
        //cré un tableau vace les pages enfants
        foreach ($pagesall as $page)
            if ($page->getParent()) $pages[$page->getParent()->getNom()][] = $page;
        $this->twig->addGlobal('temppage', $pages);
    }

    public static function getSubscribedEvents()
    {
        return [KernelEvents::CONTROLLER => 'injectGlobalVariables'];
    }
}
