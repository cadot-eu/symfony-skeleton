<?php

namespace App\Service;

class ToolsHelper
{

    /**
     * This function will return a random article from Wikipedia
     * 
     * @return the content of the page.
     */
    static function wikipedia_article_random()
    {
        if (!function_exists('curl_init')) return FALSE;
        $url = 'https://en.wikipedia.org/api/rest_v1/page/random/html';
        $options = array(
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_USERAGENT      => "spider", // who am i
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 30,      // timeout on connect
            CURLOPT_TIMEOUT        => 30,      // timeout on response
            CURLOPT_MAXREDIRS      => 3,       // stop after 10 redirects
        );

        $ch = curl_init($url);
        curl_setopt_array($ch, $options);
        $content = curl_exec($ch);
        $err = curl_errno($ch);
        $errmsg = curl_error($ch);
        $header = curl_getinfo($ch);
        curl_close($ch);
        return $content;
        if (preg_match('/<title>(.*?)<\/title>/i', $content, $matches)) {
            $title = str_replace(' - Wikipedia, the free encyclopedia', '', $matches[1]);
        }

        return '<a href="' . $header['url'] . '">' . $title . '</a>';
    }
}
