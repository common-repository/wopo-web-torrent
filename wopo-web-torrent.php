<?php
/**
 * Plugin Name:       WoPo Web Torrent
 * Plugin URI:        https://wopoweb.com/contact-us/
 * Description:       Share your file via torrent network on your browser
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            WoPo Web
 * Author URI:        https://wopoweb.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wopo-web-torrent
 * Domain Path:       /languages
 */

add_shortcode('wopo-web-torrent', 'wopowt_shortcode');
function wopowt_shortcode( $atts = [], $content = null) {
    wp_enqueue_script('wopo-web-torrent-lib',plugin_dir_url(__FILE__).'/assets/js/webtorrent.min.js');
    wp_enqueue_script('wopo-web-torrent',plugin_dir_url(__FILE__).'/assets/js/main.js',array('wopo-web-torrent-lib'));
    wp_enqueue_style('wopo-web-torrent',plugin_dir_url(__FILE__).'/assets/css/main.css');
    ob_start();    
    ?>
    <div class='wopowt_container'>
        <h3>Start sharing</h3>
        <label >Choose files to begin seeding: </label>
        <input type="file" id="btnFile" value="Choose Files" />

        <h3>Start downloading</h3>

        <label for="torrentId">Download from a magnet link or info hash: </label>
        <input name="torrentId", placeholder="magnet:" value="magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent">
        <button type="button" id="btnDownload">Download</button>

        <h3>Status</h3>
        <div class="status"></div>

        <h3>Torrent Info</h3>
        <div class="info"></div>

        <h3>Files</h3>
        <div class="files"></div>

        <h3>Log</h3>
        <div class="log"></div>
    </div>    
    <?php
    $content = ob_get_clean();
    return $content;
}