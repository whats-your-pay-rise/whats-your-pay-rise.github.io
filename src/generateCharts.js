import { renderToStaticMarkup } from 'react-dom/server';
import Graph from './Graph';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'path';

mkdir('./build/static/svg', { recursive: true })
    .then(() => {
        var foo = [];

        for (var i = -100; i <= 100; i++) {
            foo.push(i);
        }

        foo.forEach(async percentage => {
            let comparisonPay = 100;
            let currentPay = 100;

            if (percentage < 0) {
                currentPay = 100 + percentage
            } else if (percentage > 0) {
                comparisonPay = 100 - percentage
            }

            const html = renderToStaticMarkup(<Graph comparisonPay={comparisonPay} currentPay={currentPay} comparisonYear="2010" currentYear="2023" />);
            await writeFile(`./build/static/svg/${percentage}.svg`, html);
        });
    });
