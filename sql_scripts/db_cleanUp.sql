-- ******************************** READ ME *********************************
-- script to only be run after using all other scripts in sql_scripts       *
-- formats all ingredient data, adds all brands removed from ingredients    *
-- deletes all non-grocery items                                            *
-- Deletes all dupilcates from ingredients_table and brand_table            *
-- **************************************************************************

-- UPATE BRAND TABLE
-- ******************
-- INSERT INTO public.brand_table (name) VALUES('Bols');
-- INSERT INTO public.brand_table (name) VALUES('Shiraz Wolf Blass Premium');
-- INSERT INTO public.brand_table (name) VALUES('Roquefort Pappillon');
-- INSERT INTO public.brand_table (name) VALUES('Lamancha Do Crianza');
-- INSERT INTO public.brand_table (name) VALUES('Gold Formel');
-- INSERT INTO public.brand_table (name) VALUES('Richards Red');
-- INSERT INTO public.brand_table (name) VALUES('Sleeman Fine Porter');
-- INSERT INTO public.brand_table (name) VALUES('Hipnotiq');
-- INSERT INTO public.brand_table (name) VALUES('Spring Water');
-- INSERT INTO public.brand_table (name) VALUES('Metus Rose');
-- INSERT INTO public.brand_table (name) VALUES('Moosehead');
-- INSERT INTO public.brand_table (name) VALUES('Alsace Gewurztraminer');
-- INSERT INTO public.brand_table (name) VALUES('Bourgogne');
-- INSERT INTO public.brand_table (name) VALUES('Niagra');
-- INSERT INTO public.brand_table (name) VALUES('Vineland Estate Semi');
-- INSERT INTO public.brand_table (name) VALUES('Valpolicella Masi');
-- INSERT INTO public.brand_table (name) VALUES('Manischewitz Concord');
-- INSERT INTO public.brand_table (name) VALUES('Rubyport');
-- INSERT INTO public.brand_table (name) VALUES('Piper Heidsieck Brut');
-- INSERT INTO public.brand_table (name) VALUES('Shiraz South Eastern');
-- INSERT INTO public.brand_table (name) VALUES('The Pop Shoppe');
-- INSERT INTO public.brand_table (name) VALUES('Schroder And Schyl');
-- INSERT INTO public.brand_table (name) VALUES('Monin');
-- INSERT INTO public.brand_table (name) VALUES('La Vielle Ferme Cote Du');
-- INSERT INTO public.brand_table (name) VALUES('Panko');
-- INSERT INTO public.brand_table (name) VALUES('Chablis 2003 Champs');
-- INSERT INTO public.brand_table (name) VALUES('Smirnoff');
-- INSERT INTO public.brand_table (name) VALUES('Camerons Cream Ale');
-- INSERT INTO public.brand_table (name) VALUES('Merlot Vina Carmen');
-- INSERT INTO public.brand_table (name) VALUES('San Pellegrino');
-- INSERT INTO public.brand_table (name) VALUES('Drumstick');
-- INSERT INTO public.brand_table (name) VALUES('Island Oasis');
-- INSERT INTO public.brand_table (name) VALUES('Coke');
-- INSERT INTO public.brand_table (name) VALUES('Chateau Timberlay');
-- INSERT INTO public.brand_table (name) VALUES('Bacardi');
-- INSERT INTO public.brand_table (name) VALUES('Gold Label');
-- INSERT INTO public.brand_table (name) VALUES('Kellogs');
-- INSERT INTO public.brand_table (name) VALUES('Sogrape Mateus Rose');
-- INSERT INTO public.brand_table (name) VALUES('Godet White');
-- INSERT INTO public.brand_table (name) VALUES('Ocean Spray');
-- INSERT INTO public.brand_table (name) VALUES('Phillips');
-- INSERT INTO public.brand_table (name) VALUES('Queen Anne');
-- INSERT INTO public.brand_table (name) VALUES('Cousino Macul Antiguas');
-- INSERT INTO public.brand_table (name) VALUES('Longos');
-- INSERT INTO public.brand_table (name) VALUES('Gatorade');
-- INSERT INTO public.brand_table (name) VALUES('Fireball');
-- INSERT INTO public.brand_table (name) VALUES('Life Savers');
-- INSERT INTO public.brand_table (name) VALUES('Happy Planet');
-- INSERT INTO public.brand_table (name) VALUES('Masi Valpolocell');
-- INSERT INTO public.brand_table (name) VALUES('Mcguiness');
-- INSERT INTO public.brand_table (name) VALUES('Harrow Estates');
-- INSERT INTO public.brand_table (name) VALUES('Prosecco Valdobienne');
-- INSERT INTO public.brand_table (name) VALUES('Homestyle Two Bit');
-- INSERT INTO public.brand_table (name) VALUES('Jackson Triggs Okonagan');
-- INSERT INTO public.brand_table (name) VALUES('Sprite');
-- INSERT INTO public.brand_table (name) VALUES('Magnotta');
-- INSERT INTO public.brand_table (name) VALUES('Propel Sport');
-- INSERT INTO public.brand_table (name) VALUES('Penfolds Koonuga Hill');
-- INSERT INTO public.brand_table (name) VALUES('Jolt Cola');
-- INSERT INTO public.brand_table (name) VALUES('Cabernet Merlot');
-- INSERT INTO public.brand_table (name) VALUES('Casablanca Valley');
-- INSERT INTO public.brand_table (name) VALUES('Remy Pannier Rose');
-- INSERT INTO public.brand_table (name) VALUES('Molson');
-- INSERT INTO public.brand_table (name) VALUES('Braggs');
-- INSERT INTO public.brand_table (name) VALUES('Chardonnay Mondavi');
-- INSERT INTO public.brand_table (name) VALUES('Magnotta');
-- INSERT INTO public.brand_table (name) VALUES('Corona');
-- INSERT INTO public.brand_table (name) VALUES('Lindemans Bin 95');
-- INSERT INTO public.brand_table (name) VALUES('Upper Canada Light');
-- INSERT INTO public.brand_table (name) VALUES('Paulaner Hefeweisse');
-- INSERT INTO public.brand_table (name) VALUES('Ramazzotti');
-- INSERT INTO public.brand_table (name) VALUES('Stoneliegh Sauvignon');
-- INSERT INTO public.brand_table (name) VALUES('Sawmill Creek Autumn');
-- INSERT INTO public.brand_table (name) VALUES('V8 Splash');
-- INSERT INTO public.brand_table (name) VALUES('Colubia Cresh');
-- INSERT INTO public.brand_table (name) VALUES('Barbera Albe Doc 2001');
-- INSERT INTO public.brand_table (name) VALUES('Montecillo Rioja Crianza');
-- INSERT INTO public.brand_table (name) VALUES('Nantucket');
-- INSERT INTO public.brand_table (name) VALUES('Freixenet');
-- INSERT INTO public.brand_table (name) VALUES('Toasted Head');
-- INSERT INTO public.brand_table (name) VALUES('Tio Pepe Sherry Fino');
-- INSERT INTO public.brand_table (name) VALUES('True North Strong Ale');
-- INSERT INTO public.brand_table (name) VALUES('Upper Canada Lager');
-- INSERT INTO public.brand_table (name) VALUES('Vouvray Cuvee Domaine');
-- INSERT INTO public.brand_table (name) VALUES('Semi Dry Riesling Vineland');
-- INSERT INTO public.brand_table (name) VALUES('Dr. Pauly');
-- INSERT INTO public.brand_table (name) VALUES('Canada Dry');
-- INSERT INTO public.brand_table (name) VALUES('Calypso');
-- INSERT INTO public.brand_table (name) VALUES('Puree');
-- INSERT INTO public.brand_table (name) VALUES('Two Bite Cho');
-- INSERT INTO public.brand_table (name) VALUES('Niagra Peninsula Vqa');
-- INSERT INTO public.brand_table (name) VALUES('Pelee Island');
-- INSERT INTO public.brand_table (name) VALUES('Creemore');
-- INSERT INTO public.brand_table (name) VALUES('Snapple');
-- INSERT INTO public.brand_table (name) VALUES('Segura Viudas Aria Brut');
-- INSERT INTO public.brand_table (name) VALUES('Prem Select Charddonany');
-- INSERT INTO public.brand_table (name) VALUES('Longos');
-- INSERT INTO public.brand_table (name) VALUES('Coteaux Du Tricastin Ac');
-- INSERT INTO public.brand_table (name) VALUES('Southern Comfort');
-- INSERT INTO public.brand_table (name) VALUES('Fontanafredda Barolo');
-- INSERT INTO public.brand_table (name) VALUES('Nestea');
-- INSERT INTO public.brand_table (name) VALUES('Rosso Toscano Igt');
-- INSERT INTO public.brand_table (name) VALUES('Two Oceans Sauvignon');
-- INSERT INTO public.brand_table (name) VALUES('True Blue Farms');
-- INSERT INTO public.brand_table (name) VALUES('Baron De Rothschild');
-- INSERT INTO public.brand_table (name) VALUES('Alicanca Vinho Verde');
-- INSERT INTO public.brand_table (name) VALUES('Rioja Campo Viejo');
-- INSERT INTO public.brand_table (name) VALUES('7up');
-- INSERT INTO public.brand_table (name) VALUES('Courvaisier');
-- INSERT INTO public.brand_table (name) VALUES('Jolt');
-- INSERT INTO public.brand_table (name) VALUES('Miss Vickies');
-- INSERT INTO public.brand_table (name) VALUES('Black Opal Shiraz');
-- INSERT INTO public.brand_table (name) VALUES('Island Oasis');
-- INSERT INTO public.brand_table (name) VALUES('Guy Sage Touraine');

-- FORMATE INGREDIENT DATA
-- **************************
-- UPDATE public.ingredient_table SET name = 'Melon Liqueur' WHERE id = 80;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 88;
-- UPDATE public.ingredient_table SET name = 'Ice Cream Bar' WHERE id = 95;
-- UPDATE public.ingredient_table SET name = 'Cheese' WHERE id = 96;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 112;
-- UPDATE public.ingredient_table SET name = 'Bread Base' WHERE id = 125;
-- UPDATE public.ingredient_table SET name = 'Yogurt - Peach' WHERE id = 126;
-- UPDATE public.ingredient_table SET name = 'Escargot Puff' WHERE id = 136;
-- UPDATE public.ingredient_table SET name = 'Beer' WHERE id = 140;
-- UPDATE public.ingredient_table SET name = 'Mini Egg Roll, Shrimp' WHERE id = 150;
-- UPDATE public.ingredient_table SET name = 'Beer' WHERE id = 151;
-- UPDATE public.ingredient_table SET name = 'Liquor' WHERE id = 152;
-- UPDATE public.ingredient_table SET name = 'Water' WHERE id = 152;
-- UPDATE public.ingredient_table SET name = 'Juice - Pineapple' WHERE id = 152;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 168;
-- UPDATE public.ingredient_table SET name = 'Beer' WHERE id = 176;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 179;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 184;
-- UPDATE public.ingredient_table SET name = 'Juice - Tomato' WHERE id = 185;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 190;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 196;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 197;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 214;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 215;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 229;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 246;
-- UPDATE public.ingredient_table SET name = 'Squid' WHERE id = 259;
-- UPDATE public.ingredient_table SET name = 'Lobster - Tail' WHERE id = 260;
-- UPDATE public.ingredient_table SET name = 'Soda - Lime Rickey' WHERE id = 262;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 274;
-- UPDATE public.ingredient_table SET name = 'Yogurt - Blueberry' WHERE id = 277;
-- UPDATE public.ingredient_table SET name = 'Syrup' WHERE id = 279;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 296;
-- UPDATE public.ingredient_table SET name = 'Lizard Fuel' WHERE id = 298;
-- UPDATE public.ingredient_table SET name = 'Orange Roughy' WHERE id = 310;
-- UPDATE public.ingredient_table SET name = 'Juice - Apple' WHERE id = 311;
-- UPDATE public.ingredient_table SET name = 'Bread Crumbs' WHERE id = 328;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 332;
-- UPDATE public.ingredient_table SET name = 'Green Apple Twist' WHERE id = 333;
-- UPDATE public.ingredient_table SET name = 'Beer' WHERE id = 341;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 345;
-- UPDATE public.ingredient_table SET name = 'Yogurt - Banana' WHERE id = 349;
-- UPDATE public.ingredient_table SET name = 'Water' WHERE id = 362;
-- UPDATE public.ingredient_table SET name = 'Ice Cream Bar' WHERE id = 385;
-- UPDATE public.ingredient_table SET name = 'Mango Daiquiri' WHERE id = 385;
-- UPDATE public.ingredient_table SET name = 'Soda - Diet' WHERE id = 401;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 402;
-- UPDATE public.ingredient_table SET name = 'Juice - Cranberry' WHERE id = 410;
-- UPDATE public.ingredient_table SET name = 'Mojito' WHERE id = 415;
-- UPDATE public.ingredient_table SET name = 'Lobster Phyllo Roll' WHERE id = 418;
-- UPDATE public.ingredient_table SET name = 'Nori Sea Weed' WHERE id = 422;
-- UPDATE public.ingredient_table SET name = 'Green Tea Refresher' WHERE id = 428;
-- UPDATE public.ingredient_table SET name = 'Cereal in a Cup' WHERE id = 430;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 432;
-- UPDATE public.ingredient_table SET name = 'Coffee' WHERE id = 440;
-- UPDATE public.ingredient_table SET name = 'Soup - Chix Gumbo' WHERE id = 443;
-- UPDATE public.ingredient_table SET name = 'Chocolate Liqueur' WHERE id = 444;
-- UPDATE public.ingredient_table SET name = 'Juice - Kiwi Strawberry' WHERE id = 444;
-- UPDATE public.ingredient_table SET name = 'Butter Ripple' WHERE id = 444;
-- UPDATE public.ingredient_table SET name = 'Scotch' WHERE id = 467;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 472;
-- UPDATE public.ingredient_table SET name = 'Assorted Sandwhich' WHERE id = 473;
-- UPDATE public.ingredient_table SET name = 'Juice - Orange' WHERE id = 474;
-- UPDATE public.ingredient_table SET name = 'Whiskey' WHERE id = 479;
-- UPDATE public.ingredient_table SET name = 'Yogurt - Strawberry' WHERE id = 483;
-- UPDATE public.ingredient_table SET name = 'Ice Cream' WHERE id = 486;
-- UPDATE public.ingredient_table SET name = 'Juice' WHERE id = 495;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 496;
-- UPDATE public.ingredient_table SET name = 'Cookie Dough' WHERE id = 501;
-- UPDATE public.ingredient_table SET name = 'Nanticket' WHERE id = 502;
-- UPDATE public.ingredient_table SET name = 'Anisette' WHERE id = 511;
-- UPDATE public.ingredient_table SET name = 'Potato - Idaho' WHERE id = 517;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 522;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 532;
-- UPDATE public.ingredient_table SET name = 'Macaroons' WHERE id = 538;
-- UPDATE public.ingredient_table SET name = 'Veg Assortment' WHERE id = 547;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 551;
-- UPDATE public.ingredient_table SET name = 'Soda' WHERE id = 559;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 567;
-- UPDATE public.ingredient_table SET name = 'Bel Paese White' WHERE id = 567;
-- UPDATE public.ingredient_table SET name = 'Lemonade - Mandarin' WHERE id = 579;
-- UPDATE public.ingredient_table SET name = 'Juice' WHERE id = 579;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 605;
-- UPDATE public.ingredient_table SET name = 'Soda - Electric Blue' WHERE id = 609;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 614;
-- UPDATE public.ingredient_table SET name = 'Cheese Tortellini' WHERE id = 616;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 622;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 628;
-- UPDATE public.ingredient_table SET name = 'Beer' WHERE id = 633;
-- UPDATE public.ingredient_table SET name = 'Mushroom Tart' WHERE id = 640;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 643;
-- UPDATE public.ingredient_table SET name = 'Liquid Aminios Acid' WHERE id = 646;
-- UPDATE public.ingredient_table SET name = 'Soup - Pasta Fagioloi' WHERE id = 649;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 658;
-- UPDATE public.ingredient_table SET name = 'Beer' WHERE id = 659;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 666;
-- UPDATE public.ingredient_table SET name = 'Cereal Bar' WHERE id = 668;
-- UPDATE public.ingredient_table SET name = 'Beer' WHERE id = 670;
-- UPDATE public.ingredient_table SET name = 'Beer' WHERE id = 684;
-- UPDATE public.ingredient_table SET name = 'Banana Liqueur' WHERE id = 686;
-- UPDATE public.ingredient_table SET name = 'Juice - Cranberry' WHERE id = 687;
-- UPDATE public.ingredient_table SET name = 'Margarita Mix' WHERE id = 691;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 693;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 701;
-- UPDATE public.ingredient_table SET name = 'Juice - Strawberry Banana' WHERE id = 703;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 704;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 727;
-- UPDATE public.ingredient_table SET name = 'Juice - Apple' WHERE id = 734;
-- UPDATE public.ingredient_table SET name = 'Sweet and Sour Mix' WHERE id = 739;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 743;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 744;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 745;
-- UPDATE public.ingredient_table SET name = 'Beer' WHERE id = 750;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 751;
-- UPDATE public.ingredient_table SET name = 'Beer' WHERE id = 752;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 757;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 758;
-- UPDATE public.ingredient_table SET name = 'Asian Shrimp Roll' WHERE id = 775;
-- UPDATE public.ingredient_table SET name = 'Soda - Diet' WHERE id = 776;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 777;
-- UPDATE public.ingredient_table SET name = 'Soda' WHERE id = 781;
-- UPDATE public.ingredient_table SET name = 'Syrup - Passion Fruit' WHERE id = 782;
-- UPDATE public.ingredient_table SET name = 'Juice - Strawberry Lemonade' WHERE id = 783;
-- UPDATE public.ingredient_table SET name = 'Sole Gin' WHERE id = 785;
-- UPDATE public.ingredient_table SET name = 'Juice - Passion Fruit' WHERE id = 787;
-- UPDATE public.ingredient_table SET name = 'Macroons' WHERE id = 789;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 790;
-- UPDATE public.ingredient_table SET name = 'Blue Curacao' WHERE id = 792;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 821;
-- UPDATE public.ingredient_table SET name = 'Juice - Cranberry' WHERE id = 823;
-- UPDATE public.ingredient_table SET name = 'Soda - Cream Soda' WHERE id = 825;
-- UPDATE public.ingredient_table SET name = 'Brownies - Chocolate' WHERE id = 827;
-- UPDATE public.ingredient_table SET name = 'Beer' WHERE id = 836;
-- UPDATE public.ingredient_table SET name = 'Juice - Berry Energy' WHERE id = 839;
-- UPDATE public.ingredient_table SET name = 'Tea - Iced Peach' WHERE id = 852;
-- UPDATE public.ingredient_table SET name = 'Soup - Chicken Noodle' WHERE id = 854;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 864;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 865;
-- UPDATE public.ingredient_table SET name = 'Penne With Pesto' WHERE id = 870;
-- UPDATE public.ingredient_table SET name = 'Soda - Club' WHERE id = 873;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 886;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 889;
-- UPDATE public.ingredient_table SET name = 'Iced Tea - Diet' WHERE id = 898;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 901;
-- UPDATE public.ingredient_table SET name = 'Jam - Strawberry' WHERE id = 903;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 908;
-- UPDATE public.ingredient_table SET name = 'Sauce - Soy Low Sodium' WHERE id = 912;
-- UPDATE public.ingredient_table SET name = 'Blueberry' WHERE id = 917;
-- UPDATE public.ingredient_table SET name = 'Kiwi Berry Cktl' WHERE id = 921;
-- UPDATE public.ingredient_table SET name = 'Soda - Cola' WHERE id = 923;
-- UPDATE public.ingredient_table SET name = 'Juice - Cranberry' WHERE id = 925;
-- UPDATE public.ingredient_table SET name = 'Triple Sec' WHERE id = 935;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 936;
-- UPDATE public.ingredient_table SET name = 'Grilled Veg Sandwiches' WHERE id = 940;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 942;
-- UPDATE public.ingredient_table SET name = 'Brandy - Orange' WHERE id = 948;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 955;
-- UPDATE public.ingredient_table SET name = 'Tea - Lemon' WHERE id = 960;
-- UPDATE public.ingredient_table SET name = 'Tea - Grapefruit' WHERE id = 965;
-- UPDATE public.ingredient_table SET name = 'Curried Chicken' WHERE id = 975;
-- UPDATE public.ingredient_table SET name = 'Soda - Diet' WHERE id = 994;
-- UPDATE public.ingredient_table SET name = 'Cognac' WHERE id = 995;
-- UPDATE public.ingredient_table SET name = 'Milk 2%' WHERE id = 1008;
-- UPDATE public.ingredient_table SET name = 'Soda - Cola' WHERE id = 1011;
-- UPDATE public.ingredient_table SET name = 'Creme De Cacao' WHERE id = 1013;
-- UPDATE public.ingredient_table SET name = 'Juice - Tomato' WHERE id = 1015;
-- UPDATE public.ingredient_table SET name = 'Chips' WHERE id = 1020;
-- UPDATE public.ingredient_table SET name = 'Soup - Mexicali Tortilla' WHERE id = 1031;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 1035;
-- UPDATE public.ingredient_table SET name = 'Ice Cream Mix' WHERE id = 1040;
-- UPDATE public.ingredient_table SET name = 'Wine' WHERE id = 1041;

-- DELETE NON GROCERY ITEMS
-- ***************************
-- DELETE FROM public.ingredient_table WHERE id = 90;
-- DELETE FROM public.ingredient_table WHERE id = 98;
-- DELETE FROM public.ingredient_table WHERE id = 106;
-- DELETE FROM public.ingredient_table WHERE id = 113;
-- DELETE FROM public.ingredient_table WHERE id = 120;
-- DELETE FROM public.ingredient_table WHERE id = 124;
-- DELETE FROM public.ingredient_table WHERE id = 135;
-- DELETE FROM public.ingredient_table WHERE id = 144;
-- DELETE FROM public.ingredient_table WHERE id = 169;
-- DELETE FROM public.ingredient_table WHERE id = 175;
-- DELETE FROM public.ingredient_table WHERE id = 202;
-- DELETE FROM public.ingredient_table WHERE id = 263;
-- DELETE FROM public.ingredient_table WHERE id = 266;
-- DELETE FROM public.ingredient_table WHERE id = 294;
-- DELETE FROM public.ingredient_table WHERE id = 297;
-- DELETE FROM public.ingredient_table WHERE id = 308;
-- DELETE FROM public.ingredient_table WHERE id = 319;
-- DELETE FROM public.ingredient_table WHERE id = 350;
-- DELETE FROM public.ingredient_table WHERE id = 353;
-- DELETE FROM public.ingredient_table WHERE id = 356;
-- DELETE FROM public.ingredient_table WHERE id = 359;
-- DELETE FROM public.ingredient_table WHERE id = 366;
-- DELETE FROM public.ingredient_table WHERE id = 378;
-- DELETE FROM public.ingredient_table WHERE id = 381;
-- DELETE FROM public.ingredient_table WHERE id = 382;
-- DELETE FROM public.ingredient_table WHERE id = 412;
-- DELETE FROM public.ingredient_table WHERE id = 414;
-- DELETE FROM public.ingredient_table WHERE id = 454;
-- DELETE FROM public.ingredient_table WHERE id = 459;
-- DELETE FROM public.ingredient_table WHERE id = 463;
-- DELETE FROM public.ingredient_table WHERE id = 515;
-- DELETE FROM public.ingredient_table WHERE id = 526;
-- DELETE FROM public.ingredient_table WHERE id = 581;
-- DELETE FROM public.ingredient_table WHERE id = 590;
-- DELETE FROM public.ingredient_table WHERE id = 595;
-- DELETE FROM public.ingredient_table WHERE id = 608;
-- DELETE FROM public.ingredient_table WHERE id = 620;
-- DELETE FROM public.ingredient_table WHERE id = 641;
-- DELETE FROM public.ingredient_table WHERE id = 645;
-- DELETE FROM public.ingredient_table WHERE id = 655;
-- DELETE FROM public.ingredient_table WHERE id = 657;
-- DELETE FROM public.ingredient_table WHERE id = 672;
-- DELETE FROM public.ingredient_table WHERE id = 675;
-- DELETE FROM public.ingredient_table WHERE id = 683;
-- DELETE FROM public.ingredient_table WHERE id = 713;
-- DELETE FROM public.ingredient_table WHERE id = 732;
-- DELETE FROM public.ingredient_table WHERE id = 747;
-- DELETE FROM public.ingredient_table WHERE id = 760;
-- DELETE FROM public.ingredient_table WHERE id = 801;
-- DELETE FROM public.ingredient_table WHERE id = 802;
-- DELETE FROM public.ingredient_table WHERE id = 818;
-- DELETE FROM public.ingredient_table WHERE id = 820;
-- DELETE FROM public.ingredient_table WHERE id = 831;
-- DELETE FROM public.ingredient_table WHERE id = 840;
-- DELETE FROM public.ingredient_table WHERE id = 855;
-- DELETE FROM public.ingredient_table WHERE id = 856;
-- DELETE FROM public.ingredient_table WHERE id = 857;
-- DELETE FROM public.ingredient_table WHERE id = 863;
-- DELETE FROM public.ingredient_table WHERE id = 871;
-- DELETE FROM public.ingredient_table WHERE id = 877;
-- DELETE FROM public.ingredient_table WHERE id = 881;
-- DELETE FROM public.ingredient_table WHERE id = 883;
-- DELETE FROM public.ingredient_table WHERE id = 888;
-- DELETE FROM public.ingredient_table WHERE id = 892;
-- DELETE FROM public.ingredient_table WHERE id = 918;
-- DELETE FROM public.ingredient_table WHERE id = 926;
-- DELETE FROM public.ingredient_table WHERE id = 933;
-- DELETE FROM public.ingredient_table WHERE id = 934;
-- DELETE FROM public.ingredient_table WHERE id = 943;
-- DELETE FROM public.ingredient_table WHERE id = 944;
-- DELETE FROM public.ingredient_table WHERE id = 958;
-- DELETE FROM public.ingredient_table WHERE id = 966;
-- DELETE FROM public.ingredient_table WHERE id = 969;
-- DELETE FROM public.ingredient_table WHERE id = 970;
-- DELETE FROM public.ingredient_table WHERE id = 1022;
-- DELETE FROM public.ingredient_table WHERE id = 1039;
-- DELETE FROM public.ingredient_table WHERE id = 1042;
-- DELETE FROM public.ingredient_table WHERE id = 1048;
-- DELETE FROM public.ingredient_table WHERE id = 1051;

-- SHOW ALL INGREDIENTS
-- ************************
-- SELECT * FROM public.ingredient_table ORDER BY id;

-- DELETE ALL INGREDIENT DUPLICATES
-- ***********************************
-- DELETE FROM
--      public.ingredient_table a
--         USING public.ingredient_table b
-- WHERE
--     a.id < b.id
--     AND a.name = b.name;

-- SHOW ALL INGREDIENT DUPLICATES
-- *******************************
-- SELECT
--     name,
--     COUNT( name )
-- FROM
--     public.ingredient_table
-- GROUP BY
--     name
-- HAVING
--     COUNT( name )> 1
-- ORDER BY
--     name;

-- DELETE ALL BRAND DUPLICATES
-- ***********************************
-- DELETE FROM
--      public.brand_table a
--         USING public.brand_table b
-- WHERE
--     a.id < b.id
--     AND a.name = b.name;

-- SHOW ALL BRAND DUPLICATES
-- *******************************
-- SELECT
--     name,
--     COUNT( name )
-- FROM
--     public.brand_table
-- GROUP BY
--     name
-- HAVING
--     COUNT( name )> 1
-- ORDER BY
--     name;