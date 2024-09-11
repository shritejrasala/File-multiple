using Attachments as service from '../../srv/service';

annotate service.Book with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Author',
            Value : author,
        },
        {
            $Type : 'UI.DataField',
            Label : 'ISBN',
            Value : ISBN,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Published Date',
            Value : publishedDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Genre',
            Value : genre,
        },
    ]
);

annotate service.Book with @(
    UI.FieldGroup #GeneralInfo : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Author',
                Value : author,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ISBN',
                Value : ISBN,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Published Date',
                Value : publishedDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Genre',
                Value : genre,
            },
        ]
    },
    UI.FieldGroup #AdditionalDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Summary',
                Value : summary,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Cover Image',
                Value : coverImage.url,  // Correctly reference the cover image URL
            }
        ]
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneralInformation',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneralInfo',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'AdditionalDetails',
            Label : 'Additional Details',
            Target : '@UI.FieldGroup#AdditionalDetails',
        },
    ]
);
