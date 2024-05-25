<?php
/**
 * Template Name: Test Page
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

    <style>
    
html {
    scroll-behavior: initial;
    overflow: hidden;
}

html, body {
    width: 100%;
    min-height: 100%;
}

body {
    font-family: Slussen;
    font-size: 16px;
    font-weight: 400;
    background: #000;
    color: #fff;
}

h2 {
    font-size: 60px;
    font-weight: 900;
    line-height: 85%;
    border-left: 3px solid #ff98a2;
    padding: 25px;
    margin: 0
}

h2 span { display: block; }

h3 {font-size: 20px;font-stretch: expanded;color: #ff98a2;line-height: 100%;}

h2,h3,h4 {text-transform: uppercase;}

.container {
    width: 95%;
    margin: auto;
}

section {padding: 50px 0;}

.col {
    width: 50%;
}

#vertical {height: 200vh;width: 100vw;}

.vertical__content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.vertical__content .col_left {height: 100%;}

.vertical__content .col.col_right {
    width: 40%;
}

.vertical__item:not(:last-child) {
    margin-bottom: 240px;
}

#horizontal {
    padding: 100px 0;
}

.horizontal__content {
    display: flex;
}

.horizontal__item {
    border: 1px solid #efefef;
    padding: 200px 150px;

}
.horizontal__item:not(:last-child) {
    margin-right: 50px;
}

.horizontal__num {
    font-size: 80px;
    font-weight: 900;
    font-stretch: condensed;
    color: #ff98a2;
}</style>
    <section id="vertical">
        <div class="container">
            <div class="vertical__content">
                <div class="col col_left">
                    <h2 class="vertical__heading"><span>About</span><span>Smooth</span><span>Scroll</span></h2>
                </div>
                <div class="col col_right">
                    <div class="vertical__item">
                        <h3>Smooth Scroll Lenis</h3>
                        <p>Lenis is an open-source library built to standardize scroll experiences and sauce up websites with butter-smooth navigation, all while using the platform and keeping it accessible.</p>
                    </div>
                    <div class="vertical__item">
                        <h3>Smooth Scroll Lenis</h3>
                        <p>Lenis is an open-source library built to standardize scroll experiences and sauce up websites with butter-smooth navigation, all while using the platform and keeping it accessible.</p>
                    </div>
                    <div class="vertical__item">
                        <h3>Smooth Scroll Lenis</h3>
                        <p>Lenis is an open-source library built to standardize scroll experiences and sauce up websites with butter-smooth navigation, all while using the platform and keeping it accessible.</p>
                    </div>
                    <div class="vertical__item">
                        <h3>Smooth Scroll Lenis</h3>
                        <p>Lenis is an open-source library built to standardize scroll experiences and sauce up websites with butter-smooth navigation, all while using the platform and keeping it accessible.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="horizontal">
        <div class="container">
            <div class="horizontal__content">
                <div class="horizontal__item">
                    <div class="horizontal__num">1</div>
                </div>
                <div class="horizontal__item">
                    <div class="horizontal__num">2</div>
                </div>
                <div class="horizontal__item">
                    <div class="horizontal__num">3</div>
                </div>
                <div class="horizontal__item">
                    <div class="horizontal__num">4</div>
                </div>
                <div class="horizontal__item">
                    <div class="horizontal__num">5</div>
                </div>
            </div>
        </div>
    </section>


</body>
</html>
<div class="wrapper" id="<?php echo $wrapper_id; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- ok. ?>">

	<div class="<?php echo esc_attr( $container ); ?>" id="content">
    <button class="show-about">Show About</button>
    <section class="content__item content__item--about">
    <p class="content__paragraph" data-splitting>Johnathan Flynn is</p>
    <p class="content__paragraph content__paragraph--right" data-splitting>a Salt Lake City</p>
    <p class="content__paragraph" data-splitting>based <em>data</em> and <em>social</em></p>
    <p class="content__paragraph" data-splitting>engineer</p>
    <figure class="content__figure">
        <img class="content__figure-img" src="<?php the_field('image'); ?>" alt="Some image" />
        <figcaption class="content__figure-caption">
            We are here face to face with a crucial point in analytic realism...
        </figcaption>
    </figure>
</section>

<section class="content__item content__item--home">
    <p class="content__paragraph" data-splitting>Example text to hide.</p>
    <p class="content__paragraph" data-splitting>Another line of text to hide.</p>
</section>

<h1 class="scramble">Hello, World!</h1>
  <div class="content">
        
<?php
while ( have_posts() ) {
    the_post();
    get_template_part( 'loop-templates/content', 'page' );

    // If comments are open or we have at least one comment, load up the comment template.
    if ( comments_open() || get_comments_number() ) {
        comments_template();
    }
}
?>

</main>
		</div><!-- .row -->

	</div><!-- #content -->

</div><!-- #<?php echo $wrapper_id; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- ok. ?> -->

<?php
get_footer();
