/**
 * Created by ARUN on 1/3/2016.
 */

    var getMetricsConfig = function (nga) {
                var metrics = nga.entity('metrics');
                metrics.listView().fields([ //You define fields on views, not on entities, in order to be able to use a different set of fields for each view
                    nga.field('id'),
                    nga.field('name'),
                    nga.field('category'),
                    nga.field('type'),
                    nga.field('weightage'),
                    nga.field('rateorder'),
                    nga.field('icon'),
                    nga.field('iconcolor'),
                    nga.field('description')
                ]);

                metrics.creationView().fields([
                    nga.field('name').attributes({placeholder: 'Enter metrics name'}),
                    nga.field('type', 'choice')
                        .choices([
                            {label: 'Rating', value: 'Rating'},
                            {label: 'Value', value: 'Value'},
                            {label: 'Boolean', value: 'Boolean'}
                        ]),
                    nga.field('category', 'choice')
                        .choices([
                            {label: 'Analytics', value: 'Analytics'},
                            {label: 'CMS', value: 'CMS'},
                            {label: 'Email & chat', value: 'Email & chat'},
                            {label: 'Mobile & UX', value: 'Mobile & UX'},
                            {label: 'SEO & ads', value: 'SEO & ads'},
                            {label: 'social', value: 'social'}
                        ]),
                    nga.field('weightage','number').attributes({placeholder: 'Enter metrics weightage in a scale of 1-10'}),
                    nga.field('rateorder', 'choice')
                        .choices([
                            {label: 'high', value: 'high'},
                            {label: 'low', value: 'low'}
                        ]),
                    nga.field('icon').attributes({placeholder: 'Enter a bootstrap icon class Name. Eg glyphicon glyphicon-star'}),
                    nga.field('iconcolor').attributes({placeholder: 'Enter icon color in RGB'}),
                    nga.field('description').attributes({placeholder: 'Enter the description of metrics'})
                ]);
                // use the same fields for the editionView as for the creationView
                metrics.editionView().fields(metrics.creationView().fields());
                return metrics;
            };