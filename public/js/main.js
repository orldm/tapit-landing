$(function() {

    var slidesContainer = $('#JS-slidesContainer'),
        dots = slidesContainer.find('.dot'),
        img = slidesContainer.find('img'),
        timeOut;

    // preload images
    for (var i = 0; i < dots.length; i++) {
        $('<img />').attr('src','./img/slide-' + i + '.png').appendTo('body').hide();
    }

    $('.dot').click(function(e){
        e.preventDefault();
        var active = slidesContainer.find('.dot.active'),
            scrollToActivateWaypoint = -1;
        if (dots.index(this) > dots.index(active)) {
            scrollToActivateWaypoint = 1;
        }
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top + scrollToActivateWaypoint
        }, 400);
    });

    $('.slide-number-container').waypoint(function(direction) {
        var indexOffset = direction === 'down' ? 1 : 0,
            index = parseInt((this.key.slice(9)), 10) + indexOffset;
        clearTimeout(timeOut);
        if (index ===  dots.length) {
            return;
        }
        $(dots[index]).addClass('active').siblings().removeClass('active');
        
        if (img.attr('src') !== './img/slide-' + index + '.png') {
            timeOut = setTimeout(function() {
                img.fadeOut('fast', function() {
                    img.attr('src', './img/slide-' + index + '.png');
                    img.fadeIn('fast');
                });
            }, 100);
        }
    });

    $('#slide-0').waypoint(function(direction) {
        if (direction === 'down') {
            slidesContainer.addClass('JS-middle').removeClass('JS-top JS-bottom');
        } else if (direction === 'up') {
            slidesContainer.addClass('JS-top').removeClass('JS-middle JS-bottom');
        }
    });
    
    $('#slide-3').waypoint(function(direction) {
        if (direction === 'down') {
            slidesContainer.addClass('JS-bottom').removeClass('JS-top JS-middle');
        } else if (direction === 'up') {
            slidesContainer.addClass('JS-middle').removeClass('JS-top JS-bottom');
        }
    });
});