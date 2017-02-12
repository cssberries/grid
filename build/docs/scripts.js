var isResizing = false,
	lastDownX = 0;
$(function() {
	var handle = $('#handle'),
		handleInner = $('#handleInner'),
		handlerWidth = handle.width(),
		cursorWidth = 16,
		compensation = 0
		left = $('#left')
		;
	handle.on('mousedown', function(e) {
		isResizing = true;
		lastDownX = e.clientX;
		compensation = e.clientX - left.width();
	});
	$(document).on('mousemove', function(e) {
		// we don't want to do anything if we aren't resizing.
		if (!isResizing) return;
		var width = e.clientX - compensation;
		// console.log(
		// 	'handlerWidth:' + handlerWidth,
		// 	'cursor:' + e.clientX,
		// 	'compensation:' + compensation,
		// 	'lastDown:' + lastDownX,
		// 	'left width:' + left.width()
		// );
		left.css('width', width)
	}).on('mouseup', function(e) {
		// stop resizing
		isResizing = false;
	});
});
