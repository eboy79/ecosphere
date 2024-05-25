<?php
/**
 * Template Name:Sample Page
 *
 * Template for displaying a page without sidebar even if a sidebar widget is published.
 *
 *
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

?>
<div class="content-wrapper hidden">
    <div class="wrapper" id="<?php echo $wrapper_id; ?>">
        <div class="<?php echo esc_attr( $container ); ?> px-0" id="content">
            <div class="row pb-2">
                <div class="ticker-row hidden"></div>
            </div>
            <div class="row pb-2">
                <div class="ticker-row hidden"></div>
            </div>
            <div class="row pb-2">
                <div class="ticker-row hidden"></div>
            </div>
            <div class="row pb-2">
                <div class="ticker-row hidden"></div>
            </div>
            <div class="row pb-2">
                <div class="ticker-row hidden"></div>
            </div>
            <div class="row pb-2">
                <div class="ticker-row hidden"></div>
            </div>
            <div class="row pb-2">
                <div class="ticker-row hidden"></div>
            </div>
        </div>
    </div>
</div>


<?php
get_footer();
?>

