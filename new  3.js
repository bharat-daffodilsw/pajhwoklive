$scope.postLikeUnlike = function (post, like) {
	if (!$scope.usk) {
	window.location.href = "/login";
	}else{
		var query = {};
		var post_operations = {};
		post_operations._id = post._id;
		var change = false;
		if (like) {
			post.likecount = post.likecount + 1;
			post.likestatus = true;
			post_operations.likeby = [
			{"_id":$scope._id}
			];
		} else {
			post.likecount = post.likecount - 1;
			post.likestatus = false;
			post_operations.likeby = [
			{"_id":$scope._id, "__type__":"delete"}
			];
		}
		query.operations = [post_operations];
		query.table = "post__pet_social";
		$appService.save(query, ASK, OSK, function (data) {
			if (data.update.length == 0) { // @todo check response code
				if (like) {
					post.likecount = post.likecount - 1;
					post.likestatus = false;
				}
				if (!like) {
					post.likecount = post.likecount + 1;
					post.likestatus = true;
				}
			}
		});
	}
}
$scope.postFlagUnflag = function (post, flag) {
if (!$scope.usk) {
window.location.href = "/login";
}else{
var query = {};
var post_operations = {};
post_operations._id = post._id;
var change = false;
if (flag) {
post_operations.flaggedby = [
{"_id":$scope._id}
];
post_operations.flagged = true;
post.flagstatus = true;
} else {
post_operations.flaggedby = [
{"_id":$scope._id, "__type__":"delete"}
];
post_operations.flagged = true;
post.flagstatus = false;
}
query.operations = [post_operations];
query.table = "post__pet_social";
$appService.save(query, ASK, OSK, function (data) {
if (data.update.length == 0) { // @todo check response code
if (flag) {
post.flagstatus = false;
}
if (!flag) {
post.flagstatus = true;
}
}
});
}
}