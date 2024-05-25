<?php
/**
 * Template Name: Portfolio Page
 *
 * Template for displaying a page without sidebar even if a sidebar widget is published.
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );

if ( is_front_page() ) {
	get_template_part( 'global-templates/hero' );
}

$wrapper_id = 'full-width-page-wrapper';
if ( is_page_template( 'page-templates/no-title.php' ) ) {
	$wrapper_id = 'no-title-page-wrapper';
}
?>

<div class="wrapper" id="<?php echo $wrapper_id; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- ok. ?>">

	<div class="<?php echo esc_attr( $container ); ?>" id="content">

		<div class="row">

			<div class="content-area" id="primary">

				<main class="row" id="main" role="main">





<?php
$alter_args = new WP_Query([
    'numberposts' => -1, // Get all posts
    'orderby' => 'post_date',
    'order' => 'DESC',
    'post_type' => 'portfolio',
    'suppress_filters' => true,
]);
if ($alter_args->have_posts()) : ?>
    <div class="portfolio-gallery d-flex flex-wrap">
	<?php while ($alter_args->have_posts()) : $alter_args->the_post(); ?>
    <div class="col-lg-4 col-md-6 col-sm-12 col-12 portfolio-item"> <!-- Ensure visibility on all screen sizes -->
        <a href="<?php the_permalink(); ?>" class="portfolio-link">
            <div class="portfolio-wrap">
                <?php if (has_post_thumbnail()) : ?>
                    <?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'single-post-thumbnail'); ?>
                    <div class="portfolio-image" style="background-image: url('<?php echo esc_url($image[0]); ?>');">
                        <div class="portfolio-hover">
                            <div class="portfolio-title"><?php the_title(); ?></div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </a>
    </div>
<?php endwhile; ?>

    </div>
<?php endif; wp_reset_postdata(); ?>






					</div>

				</main>

			</div><!-- #primary -->

		</div><!-- .row -->

	</div><!-- #content -->

</div><!-- #<?php echo $wrapper_id; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- ok. ?> -->

<?php
get_footer();
