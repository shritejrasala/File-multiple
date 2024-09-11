namespace media;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Book {
    key id: String;
    name: String;
    author: String;               
    ISBN: String(13);             
    publishedDate: Date;          
    genre: String;                
    summary: String(5000);        
    coverImage: Association to Files; 
}

entity Files: cuid, managed {
    @Core.MediaType: mediaType
    content: LargeBinary;         
    @Core.IsMediaType: true
    mediaType: String;          
    fileName: String;           
    size: Integer;                
    url: String;                  
}
