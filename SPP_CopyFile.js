/*
SPP_ExtendedCheckIn Plugin written by John Green for The Physician's Postgraduate Press in May, 2019

The prupose of this plugin is to extend SharePointPlus's capabilities. It makes use of the Copy service
to allow duplicating files on the server.

*/
$SP().registerPlugin('CopyFile', function(setup) {
	// default values
	var _this=this;
	return _this._promise(function(prom_resolve, prom_reject) {
		setup = setup || {};
		if (!setup.source) throw "[SharepointPlus Plugin 'CopyFile'] the file destination path is required.";
		if (!setup.destination) throw "[SharepointPlus Plugin 'CopyFile'] the file destination path is required.";
		setup.url = ((setup.url===undefined)?window.location.protocol + '//' + window.location.hostname:setup.url);
		setup.url = ((setup.url.endsWith('/'))?setup.url.substring(0, setup.url.length - 1):setup.url);
		console.log(setup);
		try {
			$SP().webService({
				service:"Copy",
				operation:"CopyIntoItemsLocal",
				webURL:setup.url,
				properties:{
					SourceUrl:setup.url+setup.source,
					DestinationUrls:"<string>"+setup.url+setup.destination+"</string>"
				}
			}).then(
				function(data){
					var res = data.getElementsByTagName('CopyResult');
					if (res.length!=1){
						prom_reject(res);
					} else {
						res = res[0];
					}
					if (res.getAttributeNode('ErrorCode').value != "Success") {
						prom_reject(res);
					} else {
						prom_resolve(data);
					}
				}
			);
		} catch (e) {
			prom_reject(e);
		}
	});
});
