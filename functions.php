<?php
function ecosystem_enqueue_assets() {
    // Enqueue main stylesheet
    wp_enqueue_style('main-styles', get_template_directory_uri() . '/css/style.min.css', array(), '1.0.0', 'all');

    // Enqueue main JavaScript bundle
    wp_enqueue_script('main-scripts', get_template_directory_uri() . '/js/main.min.js', array(), '1.0.0', true);
    global $post;
    if ($post) {
        $page_slug = $post->post_name;
    } else {
        $page_slug = '';
    }
    wp_localize_script('main-scripts', 'pageData', array(
        'page_slug' => $page_slug,
        'template_directory_uri' => get_template_directory_uri(),
    ));
}
add_action('wp_enqueue_scripts', 'ecosystem_enqueue_assets');

// Enqueue Three.js and STLLoader scripts only on the 3d page
function enqueue_three_js_scripts() {
    if (is_page('3d')) {
        wp_enqueue_script('three-js', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', array(), '0.128.0', true);
        wp_enqueue_script('stl-loader', 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/STLLoader.js', array('three-js'), '0.128.0', true);
    }
}
add_action('wp_enqueue_scripts', 'enqueue_three_js_scripts', 20); // Ensure a priority that runs after WordPress sets up the page




add_action('wp_enqueue_scripts', 'enqueue_three_js_scripts', 20); // Ensure a priority that runs after WordPress sets up the page
// Disabling unnecessary scripts
function mytheme_dequeue_block_styles() {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('mediaelementplayer-legacy');
    wp_dequeue_style('wp-mediaelement');
}

add_action('wp_enqueue_scripts', 'ecosystem_enqueue_assets');
add_action('wp_enqueue_scripts', 'mytheme_dequeue_block_styles', 100);

function disable_wp_emojicons() {
    // Remove the emoji script
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_mail', 'wp_staticize_emoji_for_email');
    remove_action('the_content_feed', 'wp_staticize_emoji');
    remove_action('comment_text_rss', 'wp_staticize_emoji');

    // Remove DNS prefetch for emojis
    add_filter('emoji_svg_url', '__return_false');
}
add_action('init', 'disable_wp_emojicons');

function mytheme_remove_comment_reply_script() {
    // Check if the comment-reply script is enqueued
    if (wp_script_is('comment-reply', 'enqueued')) {
        // Dequeue the comment-reply script
        wp_dequeue_script('comment-reply');
    }
}
// Use a priority of 20 to ensure this runs after the script has been enqueued
add_action('wp_enqueue_scripts', 'mytheme_remove_comment_reply_script', 20);

function locate_template_in_folder($template) {
    // Extract the slug and name from the template path
    $template_slug = basename($template, '.php');
    $template_name = '';

    // Look in templates folder first
    $new_template = locate_template("templates/{$template_slug}-{$template_name}.php");
    if ($new_template) {
        return $new_template;
    }

    // Fallback to the default behavior
    return $template;
}
add_filter('template_include', 'locate_template_in_folder');

// Dynamically require all PHP files in the src/php directory
foreach (glob(get_template_directory() . '/src/php/*.php') as $file) {
    require_once $file;
}

// Add wordstack function
function wordstack($words) {
    // Enqueue the bundled JavaScript file
    wp_enqueue_script('main-scripts', get_template_directory_uri() . '/js/main.min.js', array(), null, true);

    // Localize script to pass PHP variables to JavaScript
    wp_localize_script('main-scripts', 'wordStackData', array(
        'words' => $words,
    ));

    // Output the necessary HTML structure
    echo '<div class="container-fluid px-0">
              <div id="svg-container">
                  <div class="wide-container" id="wide-container"></div>
              </div>
          </div>';
}