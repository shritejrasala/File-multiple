namespace media;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Book: cuid, managed {
    //key id: String;
    name: String;
    author: String;               
    ISBN: String(13);             
    publishedDate: Date;          
    genre: String;                
    summary: String(5000);        
    coverImage: Association to Files; 
    Files: Composition of many Files on Files.f_id = $self;
}

entity Files: cuid, managed {
    @Core.MediaType: mediaType
    content: LargeBinary;         
    @Core.IsMediaType: true
    mediaType: String;          
    fileName: String;           
    size: Integer;                
    url: String;   
    f_id:Association to Book;               
}
