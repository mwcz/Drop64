/*global jQuery, FileReader, imagedata_to_rgb, MedianCut, ColorPal_farb, ColorPal_ViewModel*/
/*jslint browser: true*/
// TODO this file is a mess.  Unmess it.
(function($) {

    "use strict";

    function handle_file_select( evt ) {

        var f, reader;

        if( evt.stopPropagation ) {
            evt.stopPropagation();
        }
        if( evt.preventDefault ) {
            evt.preventDefault();
        }

        f = evt.dataTransfer.files[0]; // FileList object

        reader = new FileReader();

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);

        reader.onload = function(e) {

            // [http://en.wikipedia.org/wiki/Data_URI_scheme]
            $('#data-zone').text(e.target.result);
            $('#cp-canvas').removeClass('cp-canvas-drag-over');

        };
    }


    // Drag and drop event handlers
    function file_drag_start( e ) {

        if( e.stopPropagation ) {
            e.stopPropagation();
        }

        return false;
    }

    function file_drag_enter( e ) {}

    function file_drag_over( e ) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect="copy";
        $('#cp-canvas').addClass('cp-canvas-drag-over');
    }

    function file_drag_leave( e ) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect="copy";
        $('#cp-canvas').removeClass('cp-canvas-drag-over');
    }

    function file_drag_end  ( e ) {
        $('#cp-canvas').removeClass('cp-canvas-drag-over');
    }

    $(window).load( function() {

        var image_drop_zone;

        document.getElementById("cp-input-image").onchange = handle_file_select;

        // Set up drag handles
        image_drop_zone = document.getElementById("cp-canvas");
        image_drop_zone.addEventListener( "dragstart", file_drag_start   , false );
        image_drop_zone.addEventListener( "dragenter", file_drag_enter   , false );
        image_drop_zone.addEventListener( "dragover" , file_drag_over    , false );
        image_drop_zone.addEventListener( "dragleave", file_drag_leave   , false );
        image_drop_zone.addEventListener( "drop"     , handle_file_select, false );
        image_drop_zone.addEventListener( "dragend"  , file_drag_end     , false );

        /* TODO: enable file input selection of images (esp. for mobile)
        var file_input = document.getElementById("cp-input-image");
        file_input.addEventListener( "change", handle_file_select, false );
        */


    } );

}(jQuery));
