<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package EcoSystem
 */

?>
    <!-- Page load info module -->
    <div id="page-load-info" class="terminal-window collapsed">
        <header>
            <div class="button green"></div>
            <div class="button yellow"></div>
            <div class="button red"></div>
        </header>
        <section class="terminal">
            <div id="load-stats" class="row">
                <div class="col-4">
                    <p id="file-size">File Size: <span id="file-size-value" class="stat-value">Loading...</span></p>
                </div>
                <div class="col-4">
                    <p id="dom-load-time">DOM Load Time: <span id="dom-load-time-value" class="stat-value">Loading...</span></p>
                </div>
                <div class="col-4">
                    <p id="page-load-time">Page Load Time: <span id="page-load-time-value" class="stat-value">Loading...</span></p>
                </div>
            </div>
            <div id="events-log" class="col-12">
                <h4>Event Log</h4>
                <ul id="events-list" class="events-list"></ul>
            </div>
        </section>
    </div>
    <div id="toggle-stats">
        <svg width="24" height="24">
            <line x1="5" y1="12" x2="19" y2="12" style="stroke:white;stroke-width:2" />
        </svg>
    </div>
</div>
    </div><!-- #content -->
    <div class="container">
    <footer id="colophon" class="site-footer">
        <div class="site-info">

        </div><!-- .site-info -->
    </footer><!-- #colophon -->
    </div><!-- #page -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
