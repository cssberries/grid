var isResizing = false,
	compensation = 0
$(function() {
	var handle = $('.grid__resizer'),
		handlerWidth = handle.width(),
		left = {};
	handle.on('mousedown', function(e) {
		isResizing = true;
		left = $(this).prev();
		compensation = e.clientX - left.width();
	});
	$(document).on('mousemove', function(e) {
		// we don't want to do anything if we aren't resizing.
		if (!isResizing) return;
		var width = e.clientX - compensation;
		left.css('width', width)
	}).on('mouseup', function(e) {
		// stop resizing
		isResizing = false;
	});
});
