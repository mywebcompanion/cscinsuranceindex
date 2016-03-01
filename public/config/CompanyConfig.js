/**
 * Created by ARUN on 1/3/2016.
 */
/**
 * Created by ARUN on 1/3/2016.
 */

var getCompanyConfig = function (nga) {
    var company = nga.entity('companyinfos');
    company.listView().fields([ //You define fields on views, not on entities, in order to be able to use a different set of fields for each view
        nga.field('id'),
        nga.field('companyname'),
        nga.field('countryname'),
        nga.field('weburl'),
        nga.field('blogurl'),
        nga.field('newsletter'),
        nga.field('androidapps'),
        nga.field('iosapps'),
        nga.field('twitterhandle'),
        nga.field('facebookpage'),
        nga.field('googlepage'),
        nga.field('instagrampage'),
        nga.field('youtubechannel')
    ]);
    company.listView().filters([
        nga.field('companyname'),
        nga.field('countryname'),
    ]);

    company.creationView().fields([
        nga.field('id'),
        nga.field('companyname'),
        nga.field('countryname','choice')
            .choices([
                {
                    label:'Singapore', value : 'Singapore',
                    label:'Malaysia', value : 'Malaysia',
                    label:'HongKong', value : 'HongKong'
                }
            ]),
        nga.field('weburl'),
        nga.field('blogurl'),
        nga.field('newsletter'),
        nga.field('androidapps'),
        nga.field('iosapps'),
        nga.field('twitterhandle'),
        nga.field('facebookpage'),
        nga.field('googlepage'),
        nga.field('instagrampage'),
        nga.field('youtubechannel')
    ]);
    // use the same fields for the editionView as for the creationView
    company.editionView().fields(company.creationView().fields());
    return company;
};