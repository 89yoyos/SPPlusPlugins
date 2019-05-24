/*
SPP_CheckOut Plugin written by John Green for The Physician's Postgraduate Press in May, 2019

The prupose of this plugin is to extend SharePointPlus's capabilities to allow checking files out.
(The library has a native check-in function, but no checkout function).

*/

$SP().registerPlugin('CheckOut', function(setup) {
	// default values
	var _this=this;
	return _this._promise(function(prom_resolve, prom_reject) {
		setup = setup || {};
		if (!setup.destination) throw "[SharepointPlus Plugin 'CheckOut'] the file destination path is required.";
		setup.url		= ((setup.url		===undefined)?window.location.protocol + '//' + window.location.hostname:setup.url);
		setup.toLocal	= ((setup.toLocal	===undefined)?false:setup.toLocal);
		_this.ajax({
			url: setup.url + "/_vti_bin/Lists.asmx",
			body:_this._buildBodyForSOAP("CheckOutFile",
			'<pageUrl>'+setup.destination+'</pageUrl>'+
			'<checkoutToLocal>'+setup.toLocal+'</checkoutToLocal>'
			),
			headers:{'SOAPAction':'http://schemas.microsoft.com/sharepoint/soap/CheckOutFile'}
		}).then(function(data) {
			var res = data.getElementsByTagName('CheckOutFileResult');
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
