<?php
/**
 * Template Name: Face Stack Page
 *
 * Template for displaying a page without sidebar even if a sidebar widget is published.
 *
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

// Call the wordstack function with your desired words
wordstack(array( "when ", "your ", "future ", " is ", "now", " "));

?>
<style>
        .face {
            position: relative;
            width: 200px;
            height: 300px;
            background-color: #ffcc99;
            border-radius: 50% 50% 45% 45%;
            margin: 50px auto;
        }

        .eye {
            position: absolute;
            width: 30px;
            height: 30px;
            background-color: white;
            border-radius: 50%;
            top: 80px;
        }

        .eye::before {
            content: '';
            position: absolute;
            width: 15px;
            height: 15px;
            background-color: black;
            border-radius: 50%;
            top: 8px;
            left: 8px;
        }

        .eye.left {
            left: 40px;
        }

        .eye.right {
            right: 40px;
        }

        .nose {
            position: absolute;
            width: 20px;
            height: 30px;
            background-color: #ff9966;
            border-radius: 50%;
            top: 130px;
            left: calc(50% - 10px);
        }

        .mouth {
            position: absolute;
            width: 80px;
            height: 40px;
            background-color: red;
            border-radius: 0 0 50% 50%;
            top: 180px;
            left: calc(50% - 40px);
        }

        .hair {
            position: absolute;
            width: 200px;
            height: 100px;
            background-color: brown;
            border-radius: 50% 50% 0 0;
            top: 0;
            left: 0;
        }
    </style>
<div class="content-wrapper hidden">
    <!-- Rows will be dynamically generated here -->
</div>
    <div class="face">
        <div class="hair"></div>
        <div class="eye left"></div>
        <div class="eye right"></div>
        <div class="nose"></div>
        <div class="mouth"></div>
    </div>
<?php
get_footer();
?>
