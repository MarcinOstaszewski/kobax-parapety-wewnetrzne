Aby stworzyć gotowy kod KALKULATORA PARAPETÓW MDF,
do wklejenia w bloku CustomHTML na STRONIE WordPress
(! nie może to być Post - skrypty działają tylko na Stronie !)

1. aby zbudować kod do wykorzystania na stonie WordPress
   w folderze: .../parapety-wewnetrzne uruchom:
```console
npm run build
```

2. aby zbudować TYLKO index.css z plików .sass
```console
gulp
```

kod do wklejenia na stronę WordPress powstanie w:
## /dist_kalkulator/kalkulator_parapety_wewnetrzne__kod_WordPress.html

Zaktualizowany kod umieszczamy na stronie:
https://www.fronty-meblowe.pl/formularz/wp-admin/
[dane logowania od p. Dawida]

na WP-Admin > Strony > Kalkulator parapetów... > [edit] > wklejamy cały kod z ww. pliku > [ Zapisz ]

Po zapisaniu możemy podejrzeć zmiany klikając ikonkę Zobacz stronę (prawy górny róg ekranu)