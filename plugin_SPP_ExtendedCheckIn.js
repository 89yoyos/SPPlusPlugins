/*
SPP_ExtendedCheckIn Plugin written by John Green for The Physician's Postgraduate Press in May, 2019

The prupose of this plugin is to extend SharePointPlus's checkin capabilities. Specifically, it adds
the "CheckinType" node, which allows for minor version checkins (prevents publishing pages on checkin).

*/

$SP().registerPlugin('ExtendedCheckIn', function(setup) {
	// default values
	var _this=this;
	return _this._promise(function(prom_resolve, prom_reject) {
		setup = setup || {};
		if (!setup.destination) throw "[SharepointPlus Plugin 'ExtendedCheckIn'] the file destination path is required.";
		setup.url			= ((setup.url			===undefined)?window.location.protocol + '//' + window.location.hostname:setup.url);
		setup.comment		= ((setup.comment		===undefined)?"[SharepointPlus Plugin 'ExtendedCheckIn']":setup.comment);
		setup.checkinType	= ((setup.checkinType	===undefined)?0:setup.checkinType); // 0 = minor, 1 = major, 2 = overwrite checkin
		_this.ajax({
			url: setup.url + "/_vti_bin/Lists.asmx",
			body:_this._buildBodyForSOAP("CheckInFile",
			'<pageUrl>'+setup.destination+'</pageUrl>'+
			'<comment>'+setup.comment+'</comment>'+
			'<checkoutToLocal>'+setup.checkinType+'</checkoutToLocal>'
			),
			headers:{'SOAPAction':'http://schemas.microsoft.com/sharepoint/soap/CheckInFile'}
		}).then(function(data) {
			var res = data.getElementsByTagName('CheckInFileResult');
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
