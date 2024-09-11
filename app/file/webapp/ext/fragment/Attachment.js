sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
	"sap/ui/core/Item",
	"sap/m/MessageToast"
], function(MessageToast) {
    'use strict';
	var that = this;

    return {
        onPress: function(oEvent) {
            debugger
            MessageToast.show("Custom handler invoked.");
        },
		onAfterItemAdded: function(oEvent) {
			debugger;
			var item = oEvent.getParameter("item");
		
			var _createEntity = function(item) {
				var data = {
					mediaType: item.getMediaType(),
					fileName: item.getFileName(),
					size: item.getFileObject().size
				};
		
				var settings = {
					url: "/odata/v4/attachments/Files",
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					data: JSON.stringify(data)
				};
		
				return new Promise((resolve, reject) => {
					$.ajax(settings)
						.done((results, textStatus, request) => {
							resolve(results.ID);
						})
						.fail((err) => {
							reject(err);
						});
				});
			};
		
			_createEntity(item)
				.then((id) => {
					var url = `/odata/v4/attachments/Files(${id})/content`;
					item.setUploadUrl(url);
					var oUploadSet = this.byId("uploadSet");
					oUploadSet.setHttpRequestMethod("PUT");
					oUploadSet.uploadItem(item);
				})
				.catch((err) => {
					console.log(err);
				});
		},
        
			onUploadCompleted: function (oEvent) {
				var oUploadSet = this.byId("uploadSet");
				oUploadSet.removeAllIncompleteItems();
				oUploadSet.getBinding("items").refresh();
			},

			onRemovePressed: function (oEvent) {
				oEvent.preventDefault();
				oEvent.getParameter("item").getBindingContext().delete();
				MessageToast.show("Selected file has been deleted");
			},

			onOpenPressed: function(oEvent) {
				debugger
				oEvent.preventDefault();
				var item = oEvent.getSource();
				var fileName = item.getFileName();
				
				var _download = function(item) {
					var settings = {
						url: item.getUrl(),
						method: "GET",
						headers: {
							"Content-type": "application/octet-stream"
						},
						xhrFields: {
							responseType: 'blob'
						}
					};
	
					return new Promise((resolve, reject) => {
						$.ajax(settings)
							.done((result) => {
								resolve(result);
							})
							.fail((err) => {
								reject(err);
							});
					});
				};
	
				_download(item)
					.then((blob) => {
						var url = window.URL.createObjectURL(blob);
						var link = document.createElement('a');
						link.href = url;
						link.setAttribute('download', fileName);
						document.body.appendChild(link);
						link.click();
						document.body.removeChild(link);
					})
					.catch((err) => {
						console.log(err);
					});
			},

			_download: function (item) {
				var settings = {
					url: item.getUrl(),
					method: "GET",
					headers: {
						"Content-type": "application/octet-stream"
					},
					xhrFields: {
						responseType: 'blob'
					}
				}

				return new Promise((resolve, reject) => {
					$.ajax(settings)
						.done((result) => {
							resolve(result)
						})
						.fail((err) => {
							reject(err)
						})
				});
			},

			_createEntity: function (item) {
				var data = {
					mediaType: item.getMediaType(),
					fileName: item.getFileName(),
					size: item.getFileObject().size
				};

				var settings = {
					url: "/attachments/Files",
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					data: JSON.stringify(data)
				}

				return new Promise((resolve, reject) => {
					$.ajax(settings)
						.done((results, textStatus, request) => {
							resolve(results.ID);
						})
						.fail((err) => {
							reject(err);
						})
				})
			},

			_uploadContent: function (item, id) {
				var url = `/attachments/Files(${id})/content`
				item.setUploadUrl(url);
				var oUploadSet = this.byId("uploadSet");
				oUploadSet.setHttpRequestMethod("PUT")
				oUploadSet.uploadItem(item);
			},

			//formatters
			formatThumbnailUrl: function (mediaType) {
				var iconUrl;
				switch (mediaType) {
					case "image/png":
					case "image/jpeg":
						// Custom icon for image files (PNG, JPEG)
						iconUrl = "https://example.com/icons/image-icon.png";
						break;
					case "text/plain":
						// Custom icon for text files (TXT)
						iconUrl = "https://example.com/icons/text-file-icon.png";
						break;
					case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
						// Custom Excel icon URL from Pinterest
						iconUrl = "https://i.pinimg.com/564x/0f/3b/34/0f3b34b0d3ed49d93c08045b4a7c5c9b.jpg";
						break;
					case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
						// Custom icon for Word documents (DOCX)
						iconUrl = "https://example.com/icons/word-icon.png";
						break;
					case "application/pdf":
						// Custom icon for PDF files (PDF)
						iconUrl = "https://example.com/icons/pdf-icon.png";
						break;
					default:
						// Default icon for other file types
						iconUrl = "https://example.com/icons/default-attachment-icon.png";
				}
				return iconUrl;
			}
			
    };
});
