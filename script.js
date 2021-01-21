let qrcode = document.querySelector('img');
let qrtext = document.querySelector('textarea');
let qrbtn = document.querySelector('.generate');
let qrDownload = document.querySelector('.download')

qrbtn.addEventListener('click', generateQR);

function generateQR(){
    let size = '1000x1000';
    let data = qrtext.value;
    let baseURL = 'http://api.qrserver.com/v1/create-qr-code/';
    
    let url = `${baseURL}?data=${data}&size=${size}`;

    qrcode.src = url;

    qrDownload.style.display = 'block';
}

$('.download').on('click', function(){
	$.ajax({
		url: `${qrcode.src}`,
		dataType: 'binary',
		method: 'GET',
		xhrFields: {
			responseType: 'blob'
		},
		success: function(data, status, xhr) {
			var blob = new Blob([data], {type: xhr.getResponseHeader('Content-Type')});
			var link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = 'QR-code.png';
			link.click();
		}
	});
});