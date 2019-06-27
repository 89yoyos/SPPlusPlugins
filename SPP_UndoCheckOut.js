/*
SPP_UndoCheckOut Plugin written by John Green for The Physician's Postgraduate Press in June, 2019

The prupose of this plugin is to enable discarding checkouts with the same simplicity as checking the files out initially.

*/

$SP().registerPlugin('UndoCheckOut', function(setup) {
	// default values
	var _this=this;
	return _this._promise(function(prom_resolve, prom_reject) {
		setup = setup || {};
		if (!setup.destination) throw "[SharepointPlus Plugin 'UndoCheckOut'] the file destination path is required.";
		setup.url = ((setup.url===undefined)?window.location.protocol + '//' + window.location.hostname:setup.url);
		_this.ajax({
			url: setup.url + "/_vti_bin/Lists.asmx",
			body:_this._buildBodyForSOAP("UndoCheckOut",
			'<pageUrl>'+setup.destination+'</pageUrl>'
			),
			headers:{'SOAPAction':'http://schemas.microsoft.com/sharepoint/soap/UndoCheckOut'}
		}).then(function(data) {
			var res = data.getElementsByTagName('UndoCheckOutResult');
			res = (res.length>0 ? res[0] : null);
			if (res && res.firstChild.nodeValue != "true") {
				prom_reject(res);
			} else {
				prom_resolve();
			}
		},
		function(err) { prom_reject(err) });
	});
});
