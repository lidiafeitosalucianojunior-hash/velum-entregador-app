(function(){
 'use strict';
 const ROOT=window;
 if(ROOT.__lumenShareV8&&ROOT.__lumenShareV8.ready)return;
 const old=ROOT.__lumenShareV2Teardown;
 if(typeof old==='function')try{old()}catch(_){}
 const catalogItems=[["SCHUTZ X TRICÔ (OFF)","9542","1e8b62_3bc0488c012e4d69a8fa2d65d1f4e56d~mv2.png",["35","36","37","38","39"],["rasteira"],true],["SCHUTZ X TRICÔ (NUDE)","9549","1e8b62_755f315e4fb8460e880a891a5001c9f3~mv2.png",["34","35","36","37","38","39"],["rasteira"],true],["SCHUTZ X TRICÔ (PRETO)","9556","1e8b62_d6710e64e9b64b4eacf9b67e5408528a~mv2.png",["34","35","36","38","39"],["rasteira"],true],["TAMANCO PRADA (BRANCO )","9521","1e8b62_a8e86aab05ad4427ae7f30777f9aa603~mv2.png",["35","37","38","34","39"],["salto"],true],["TAMANCO PRADA (PRETO )","9528","1e8b62_7c30b23c5fad4661a5ef74d6dd1bd5a4~mv2.png",["35","36","37","38","34","39"],["salto"],true],["TAMANCO PRADA (CARAMELO )","9535","1e8b62_ebb2bead96c74a4c929cb8563f69d4ae~mv2.png",["35","36","37","38","34","39"],["salto"],true],["Tamanco Laço Di Valentini ( OURO)","9493","1e8b62_87973ca640fe4e618cb004bcec66fe4e~mv2.png",["36","37","38","34","39"],["salto"],true],["Tamanco Laço Di Valentini (PRATA )","9500","1e8b62_37b01110f4534feebc3bd73144bf52ab~mv2.png",["35","36","37","38","34","39"],["salto"],true],["Tamanco Laço Di Valentini (PRETO )","9507","1e8b62_6a6c05e795c64bd9b5a5c39bd48058c2~mv2.png",["35","36","37","38","34","39"],["salto"],true],["Tamanco Laço Di Valentini (BRANCO )","9514","1e8b62_85c1f76bc5f2446c90ccdea7863d37f1~mv2.png",["35","36","37","38","39"],["salto"],true],["Sapatilha Gucci Telinha (PRETO )","9486","1e8b62_ea4b59969c8447b69ed3994c93b3bac2~mv2.png",["35","36","37"],["tenis","rasteira"],true],["Sapatilha Gucci Telinha (MAROM)","9479","1e8b62_37f3097241aa4b159a0950a9e58286f0~mv2.png",["37","38"],["tenis","rasteira"],true],["TAMANCO BIQUEIRA (PRETO)","9472","1e8b62_7203f86c1305441d96e335579726fc5c~mv2.png",["35","38","34","39"],["salto"],true],["TAMANCO (OURO)","9465","1e8b62_f75f554578374833a4473c097266bd44~mv2.png",["35","36","37","38","39"],["salto"],true],["SALTINHO TIRA (PRETO )","9458","1e8b62_11da3bdd631143dc8dd1fd8fe38b3074~mv2.png",["36","37","38","34","39"],["salto"],true],["Tênis NB  1080 v15 (RORA)","9416","1e8b62_0e64adefe7304d9e98a2f06ed3924f28~mv2.png",["34","35","36","37","38","39"],["tenis"],true],["Tênis NB  1080 v15 (COBRE)","9423","1e8b62_64d7ccb1d15d4f129b8d3fb4b061a5f4~mv2.png",["35"],["tenis"],true],["Tênis Adidas Super Nova V3 ","9430","1e8b62_8fbd253f09724a2592866387d48349d9~mv2.png",["34","35","36","37","38"],["tenis"],true],["Tênis NB 9060 R","9437","1e8b62_6068d84f1d394ab8856b161fd311f922~mv2.png",["34","37"],["tenis"],true],["Tênis NIKEV 7 ( CAFÉ)","9444","1e8b62_99b390cda46b4c75b078abe306e1a6df~mv2.png",["34","35","36","37","38"],["tenis"],true],["Tênis NIKEV 7 (OFF)","9451","1e8b62_a5cb9df850454ea0852d552fd9630615~mv2.png",["35","36","37","38"],["tenis"],true],["TAMANCO  (PRATA)","9374","1e8b62_c81a59e688ee49ae9ece440dada27401~mv2.png",["35","38","34"],["salto"],true],["TAMANCO LUXO (PRETO)","9381","1e8b62_d1db65c269754da298788259bffcfddc~mv2.png",["35","38","34"],["salto"],true],["TAMANCO LUXO (Whisky )","9388","1e8b62_32db3cf5ac3342a9a78e5d50f07dac86~mv2.png",["35","36","37","38","34"],["salto"],true],["TAMANCO LUXO (OURO )","9395","1e8b62_3759bcafa27d4334affff36eb36a2e0b~mv2.png",["35","34"],["salto"],true],["TAMANCO TARÇA (OURO )","9402","1e8b62_9ede069c3a8644859fd10a354d50a17d~mv2.png",["35","39"],["salto"],true],["SALTINHO TIRA (OURO )","9409","1e8b62_2147cbd3925d4fc897ad061414cea0a8~mv2.png",["38","34","39"],["salto"],true],["PAPETE SERPENTE","9367","1e8b62_85b09ebe5d8549a68713961dae443754~mv2.jpeg",["35","38","39"],["papete"],true],["RASTEIRA RAFIA (PRETA)","9345","ae34e2_9ac28066ead24cf4bd542673da18ba2d~mv2.jpg",["34","35","36","37","38","39"],["rasteira"],false],["RASTEIRA RAFIA (CARAMELO )","9352","ae34e2_504ea0bd32594d8cb4361f58d6396bec~mv2.jpg",["34","35","36","37","38","39"],["rasteira"],false],["RASTEIRA ESFERAS (PRATA)","9338","ae34e2_9461f634c0ac4855b8ee35cb67fd371c~mv2.jpg",["34","35","36","37","38","39"],["rasteira"],true],["PAPETE BIRKEN SCHUTZ (PRETO)","9317","ae34e2_18739cda471f4889b62f96a7ab94a7a5~mv2.jpg",["34","35","36","37","38","39"],["papete"],false],["PAPETE BIRKEN SCHUTZ (OFF)","9324","ae34e2_6c4a6b0318be4dc094432c62ccb9248c~mv2.jpg",["35","37"],["papete"],true],["PAPETE BIRKEN SCHUTZ (WISK )","9331","ae34e2_a7a22024bd534baeab18565ef8cc29dd~mv2.jpg",["34","35","36","37","38","39"],["papete"],false],["Flat SCHUTZ FIVELA (CARAMELO )","9296","ae34e2_49d64fc340b94a9a97fe18eb5344cb33~mv2.jpg",["35","36","37","38"],["rasteira"],true],["Flat SCHUTZ FIVELA (PRETO)","9303","ae34e2_1d872b18afa54e5db76c398b9d9699ed~mv2.jpg",["35","36","37","38"],["rasteira"],true],["Flat SCHUTZ FIVELA (BRANCO )","9310","ae34e2_d76ae94c5b8a4ed6a7eb9e50c2e07480~mv2.jpg",["35","36","37","38","39"],["rasteira"],true],["RASTEIRA STRASS (OURO)","9289","1e8b62_85ddd436e12f49bab9cf21ffabb38263~mv2.jpeg",["34","36","37","38","39"],["rasteira"],true],["SLINGBACK TELINHA (PRETO)","9268","1e8b62_ccab0122920748afbef4fc67e1363eb3~mv2.jpeg",["34"],["salto"],true],["SLINGBACK TELINHA (CAFÉ )","9275","1e8b62_cb83c68056924717a77326da77953b03~mv2.jpeg",[],["salto"],false],["SLINGBACK TELINHA (CARAMELO )","9282","1e8b62_3a8489a12cc74cff92194b4341a1a236~mv2.jpeg",["35","38"],["salto"],true],["BOLSA LUXO (CARAMELO)","9258","1e8b62_b65b0c7137244b76bc77cb52dd390530~mv2.jpeg",[],["bolsas"],false],["TAMANCO LUMEN (CARAMELO )","9223","1e8b62_e3cea18e7fce47b68b91f2be0ba98050~mv2.jpeg",["35","36","37","38","34","39"],["salto"],true],["TAMANCO LUMEN (CAFE )","9230","1e8b62_fe8d333e0f8b48e08445d3bd32bc11ed~mv2.jpeg",["35","36","37","38","34","39"],["salto"],true],["TAMANCO LUMEN (OURO )","9237","1e8b62_95bbaa859d124c0a9c968a6e36c2b162~mv2.jpeg",["35","36","37","38","39"],["salto"],true],["TAMANCO LUMEN (BRANCO )","9244","1e8b62_2386e3f3b3f340de84bbf4066caac632~mv2.jpeg",["35","37","38"],["salto"],true],["TAMANCO LUMEN (PRETO )","9251","1e8b62_12307b4f8354417eb6094cdc9327dfbd~mv2.jpeg",["36","37","38","39"],["salto"],true],["PAPETE PRADA","9216","1e8b62_b9797cbab9314a798d874f812f04b8cf~mv2.png",["34","35"],["papete"],true],["PAPETE SCHUTS (CARAMELO)","9202","1e8b62_287cf13ee639426baf73fbd485495693~mv2.jpeg",["37"],["papete"],true],["PAPETE SCHUTS (PRETA)","9209","1e8b62_003c394d935e4a839c26b54f41706aba~mv2.jpeg",["36","39"],["papete"],true],["SCHUTZ (PRETA)","9181","1e8b62_f9880b91b1a84f33921a83f88f91a445~mv2.jpeg",["34","35","36","38"],["rasteira"],true],["SCHUTZ (CARAMELO )","9188","1e8b62_ccac0d15277e4bec894cd11a6134651a~mv2.jpeg",["34","35","36","37"],["rasteira"],true],["SCHUTZ (OFF )","9195","1e8b62_3d2a55164b3142509d94858a39fcf91f~mv2.jpeg",["34","37","38","39"],["rasteira"],true],["Tênis NB  (PRETO)","9160","1e8b62_f628b980644f492589b55298b7cdd8ee~mv2.jpeg",["34","35","36"],["tenis"],true],["Tênis NB 9060 (BRANCO/PRETO)","9167","1e8b62_a669c5dbfbe64b24bd0ca9913a7b0d0b~mv2.jpeg",["35","36"],["tenis"],true],["Tênis NB 9060 (BRANCO)","9174","1e8b62_cc24c394653c4d6cb5fe07788715645b~mv2.jpeg",["35"],["tenis"],true],["COBRA SCHUTZ STRASS II (DOURADA)","9146","1e8b62_6b5535ad796c4007a702b0c302b916af~mv2.jpeg",["36"],["rasteira"],true],["RASTEIRA AREZZO (OURO)","9139","1e8b62_94cbaacd1193411cb7abb6bd02f29d32~mv2.jpeg",["36","39"],["rasteira"],true],["RASTEIRA AREZZO (PRATA)","9132","1e8b62_1d65a9c50eef469cb53a245a6ce0a0b2~mv2.jpeg",["38","39"],["rasteira"],true],["PAPETE VITÓRIA (OFF)","9111","1e8b62_f2ca705600df4fe7bd6dcf7f58f5ebad~mv2.png",["39"],["papete"],true],["PAPETE VITÓRIA (OURO)","9118","1e8b62_8b67187611d34e70a468deeb63b8f794~mv2.png",[],["papete"],false],["PAPETE VITÓRIA (MARON)","9125","1e8b62_653def5e81334a7995dad052b07b8f8b~mv2.png",[],["papete"],false],["PAPETE AURORA (CARAMELO)","9090","1e8b62_0b24c2e5e48547babf72f20c5d124394~mv2.png",["34","38"],["papete"],true],["PAPETE AURORA (OURO)","9097","1e8b62_6f549fb9c893450184928da4c206b026~mv2.png",[],["papete"],false],["PAPETE AURORA (OFF)","9104","1e8b62_c4db3640d3d0424da55078ca468cb959~mv2.png",["34","36","38"],["papete"],true],["Tênis ADIDAS SAMBA ( OFF)","9083","1e8b62_463ab46b878d40e2a2efb6c02b1f5414~mv2.png",[],["tenis"],false],["TAMANCO SCHUTS (OFF )","9055","1e8b62_e52b0a1dc0944bd59f0b3e10151d4ed6~mv2.png",["36","37","38","39"],["salto"],true],["TAMANCO SCHUTS (PRETO )","9062","1e8b62_c97ffd4cc9a7455ab8a09a3a1a593608~mv2.png",["35","36","37","38","34","39"],["salto"],true],["TAMANCO SCHUTS (PRATA )","9069","1e8b62_e7132938065844cdba4ec936f6fc4892~mv2.png",["35","36","38"],["salto"],true],["TAMANCO SCHUTS (CARAMELO )","9076","1e8b62_771beeb413a841238008918fd542aa2f~mv2.png",["35","37","38","39"],["salto"],true],["BRIZZA AREZZO  (CARAMELO )","9036","1e8b62_0ac02b1a593542da8c0a1da62e2fd972~mv2.png",["39/40"],["nuvem"],true],["PAPETE LUXO SCHUTS ( PRETO)","9022","1e8b62_108b10b9d5c741f4af306c5acaf2257b~mv2.png",["34","36","37"],["papete"],true],["PAPETE LUXO SCHUTS (CARAMELO)","9029","1e8b62_32ed83adf6f441e99c8e1959654feb53~mv2.png",["35","37","38"],["papete"],true],["RASTEIRA SCHUTZ","9015","1e8b62_c1fbd1ab48f048e3a9010f9d8ac0d324~mv2.png",["35"],["rasteira"],false],["RASTEIRA  BOUTIQUE  (OURO)","8980","1e8b62_5c685e22938f4dca80888418ef410df9~mv2.png",["39"],["rasteira"],true],["RASTEIRA SERPENTE (MARROM)","8973","1e8b62_6bb930d6ddcb4d698f8d53a522b6f647~mv2.png",["35","38"],["rasteira"],true],["Tênis NB 9060 (MARROM )","8987","1e8b62_f70e59402129473fa088ac83f3e0b7ec~mv2.png",["35","38"],["tenis"],true],["Tênis NB 9060 (OFF/CURCUMAN )","8994","1e8b62_2a1b5b91ccf84e2ca8340967810edf31~mv2.png",["34","35","37"],["tenis"],true],["Tênis NB 9060 (OFF/VINHO )","9001","1e8b62_06df435c46d4481c9fba3e629183a8de~mv2.png",["34"],["tenis"],true],["RASTEIRA ESFERAS (OURO)","8959","1e8b62_168f7f8ff2de41799069130391a26672~mv2.png",["34","35","36","37","38","39"],["rasteira"],true],["RASTEIRA PREMIUM OLHO GREGO (PRATA)","8945","1e8b62_26e6610c5e6f4682b1cf6973708d3e2e~mv2.png",["34","35","38"],["rasteira"],true],["COBRA SCHUTZ STRASS (PRATA)","8931","1e8b62_036bef5736a340cb9590a67d377e82bc~mv2.png",["37","38"],["rasteira"],true],["COBRA SCHUTZ STRASS (DOURADA)","8938","1e8b62_e6bf0a30da3e42e28337620ccdb4b6bb~mv2.png",["38"],["rasteira"],true],["TÊNIS NIKE FIT (OFF/CINZA)","8924","1e8b62_b7ca450b1770491080b55596a9c9aa73~mv2.jpg",["35","36"],["tenis"],true],["NIKE FIT (CAFE )","8903","1e8b62_6f638fc2bbd14909a4e9b3275a503a08~mv2.png",["34","35"],["tenis"],true],["ADIDAS ( café)","8910","1e8b62_9e48873f184f4484808ad1c01a96ff05~mv2.png",["34","35"],["tenis"],true],["Tênis NB 9060 (BRANCO/PRATA)","8882","1e8b62_0182ef11b8404ecc86bff4fc84e4ccd6~mv2.png",["34"],["tenis"],true],["TAMANQUINHO BLOCO  (PRATA )","8875","1e8b62_2b1060305a9c40809b5f6e35dc36ed8a~mv2.png",["35","36","37","38","39"],["salto"],true],["RASTEIRA BICO FOLHA","8861","1e8b62_231009f1f2a24bdeb789eeca6b763954~mv2.jpeg",["35"],["rasteira"],true],["RASTEIRA LUXO ( OFF)","8833","1e8b62_fe7309e921404b4b881d23cc55b49258~mv2.png",["37","39"],["rasteira"],true],["RASTEIRA LUXO ( PRETO)","8840","1e8b62_594e222b09eb43d8a44395634f2dae31~mv2.png",["35","37","39"],["rasteira"],true],["RASTEIRA LUXO (CAFÉ )","8847","1e8b62_71a85fd61f844fa1beb8310c8e22020e~mv2.png",["39"],["rasteira"],true],["TAMANQUINHO BLOCO  (CARAMELO )","8805","1e8b62_a7a9699650c04fb580f066eb3c8c4433~mv2.png",["36","38","39"],["salto"],true],["TAMANQUINHO BLOCO  (PRETO )","8812","1e8b62_061e3a67d6d94df1833733058de6de4a~mv2.png",["37","38","39"],["salto"],true],["TAMANQUINHO BLOCO  (OFF )","8819","1e8b62_44aebd598d3b4695864b602ea81d0c21~mv2.png",["36","37","38","39"],["salto"],true],["TAMANQUINHO BLOCO  (OURO )","8826","1e8b62_1d3138531a554100a47537001bbaa8bc~mv2.png",["35","37","38","39"],["salto"],true],["ANABELA MÔNACO (MALBEC )","8784","1e8b62_26d2d1b47e59478f8d852432a5dbf8de~mv2.jpg",["35","36","37"],["papete"],true],["ANABELA MÔNACO (PRETO)","8791","1e8b62_38d421eb8d7445889e2b2ecf7b41717c~mv2.jpeg",["38"],["papete"],true],["ANABELA MÔNACO (CARAMELO)","8798","1e8b62_60e95f91eeaa45f48d9c95075c39ada3~mv2.jpeg",["35","36","37","38","34","39"],["papete"],true],["NIKE FIT (BRANCO/ROSE )","8728","1e8b62_de3d57af757948e78a820b86f14374d0~mv2.png",["37","39"],["tenis"],true],["Tênis NB 9060 (OFF/LIMAO)","8721","1e8b62_93f891fedaa649ccb73627525c3dfbc7~mv2.png",["34","35"],["tenis"],true],["ADIDAS BOSTON ( PRETO/BRANCO)","8700","1e8b62_7fc5c580e83d4895902673979280e8f7~mv2.png",["34"],["tenis"],true],["ADIDAS BOSTON ( BRANCO/VERDE ÁGUA)","8707","1e8b62_9cff7fad1bb34adf8185930cba38a420~mv2.png",["34","35","36","39"],["tenis"],true],["NUVEM BRIZZA AREZZO  (BRANCO )","8672","1e8b62_048520a0933c4e12ab7347e52f2bba74~mv2.jpeg",["33/34","39/40"],["nuvem"],true],["NUVEM BRIZZA AREZZO  (CARAMELO )","8676","1e8b62_77584c43384f432da39225cf2ac19c39~mv2.jpeg",["39/40"],["nuvem"],true],["NUVEM BRIZZA AREZZO (PRETO )","8668","1e8b62_e232af40a23245af9d3ce6f8346def26~mv2.jpeg",["39/40"],["nuvem"],true],["BRIZZA AREZZO  (OFF )","8680","1e8b62_e8f53c207f7e4c34a4a8e9516c115247~mv2.jpeg",["33/34","35/36","37/38","39/40"],["nuvem"],true],["BRIZZA AREZZO  (PRETO )","8684","1e8b62_9d6ec0db1da943ffb3490c5d21e802cc~mv2.jpeg",["33/34","35/36","37/38","39/40"],["nuvem"],true],["BRIZZA AREZZO  (BRANCO )","8688","1e8b62_ada520e5ed864cbdb4c16aced50a4e78~mv2.jpeg",["37/8","39/40"],["nuvem"],true],["PLATAFORMA GUCCI ( OFF )","8612","1e8b62_7989d73e70374441a6c27ea1a8ce168d~mv2.jpeg",["37","38","39"],["papete"],true],["Tênis NB 9060 (OFF/CAFE)","8591","1e8b62_61a3900fac3b445c8df93c99feb78db1~mv2.png",["35"],["tenis"],true],["Tênis NB 9060 (OFF/CELESTE)","8605","1e8b62_e14da01b6e06447caed7fcc2b87c3806~mv2.png",["35"],["tenis"],true],["NIKE FIT ( BEGE/MARROM)","8556","1e8b62_b0677a6bc1144e6ba1ee1912d637e358~mv2.jpeg",["34","35"],["tenis"],true],["NIKE FIT (OFF/ DOURADO )","8570","1e8b62_c203d04d8c3544798c38324ada260248~mv2.jpeg",["34"],["tenis"],true],["SALTO FINO BEBECE ( OFF)","8542","1e8b62_e753acbc050245b18d19178f03240b56~mv2.png",["35","36","37","38","34","39"],["salto"],true],["SALTO FINO BEBECE ( PRETO )","8549","1e8b62_d747cea8eb7f4b75b5ec53074c1b3fc6~mv2.png",["37"],["salto"],true],["FLATFORM BRIZZA SQUARE  (PRETA)","8523","1e8b62_0ea02ddbdbfd412db398c84c03d49212~mv2.jpeg",["33/34","37/38","39/40"],["chinelo"],true],["FLATFORM BRIZZA SQUARE  (MARSALA)","8503","1e8b62_abb65e4ff1a24a539ce076ad3b94e6d0~mv2.png",["33/34","35/36","39/40"],["chinelo"],true],["FLATFORM BRIZZA SQUARE  (CAFÉ)","8508","1e8b62_0794c127cb814b24a8abc26eeee05cf7~mv2.png",["37/38","39/40"],["chinelo"],true],["FLATFORM BRIZZA SQUARE (OFF)","8513","1e8b62_abf36c7a7d694287b3d6f602370b7fae~mv2.png",["39/40"],["chinelo"],true],["FLATFORM BRIZZA AREZZO  (CAPUCHINHO)","8498","1e8b62_0d65bf5d2e6547489ba366d39dc1ef24~mv2.png",["39/40"],["chinelo"],true],["FLATFORM BRIZZA AREZZO (OFF )","8488","1e8b62_cc938dc1ca464649b68764071107a5cc~mv2.png",["37/38","39/40"],["chinelo"],true],["FLATFORM BRIZZA AREZZO (PRETO )","8493","1e8b62_13f4bde10a0b41d4977993b2b954a855~mv2.png",["39/40"],["chinelo"],true],["Tênis ADIDAS SAMBA ( OFF/ PRETO)","8351","1e8b62_0e98427c0e1340409244641a75eadcba~mv2.png",[],["tenis"],false],["TÊNIS ADIDAS ADIZERO ( ROSA )","8379","1e8b62_d7ba8618cf5c469985dac70a648a2c40~mv2.png",["34","35","37","38"],["tenis"],true],["Tênis ADIDAS  ( ROSA )","8386","1e8b62_c5c0ded817d74b1a9003382a9037f93b~mv2.png",["34","35","36","37","38"],["tenis"],true],["Tênis ADIDAS  ( PINK )","8393","1e8b62_abd0d677b2284760834a9bd9cfd923d8~mv2.png",["34","35","36","37","38","39"],["tenis"],true],["NEW 9060( OFF/CANELA )","8400","1e8b62_1ac88391c0644addafbee7b46e21705b~mv2.png",["34","35","36","37","39"],["tenis"],true],["NEW 9060( OFF/ROSA )","8407","1e8b62_fc54788f6bb648c38d86d5946eb088ea~mv2.png",["34"],["tenis"],true],["CHINELO AREZZO ( CARAMELO )","8336","1e8b62_96829561fcf74b228a335f1939877a9c~mv2.png",["33/34"],["chinelo"],true],["CHINELO AREZZO ( OFF )","8346","1e8b62_1bda4fdc729c47fa9157c3120f69dd13~mv2.png",["33/34"],["chinelo"],true],["SALTO MARIOTTA 42694 OURO","8315","1e8b62_ebd27e7f73684a73a4a92ffc0a11ea23~mv2.png",["35","36","37","38","34","39"],["salto"],true],["SALTO MARIOTTA  ELETTRA OURO","8308","1e8b62_cd0abcf16f964347a2daedebf49db4e0~mv2.png",["35","36","37","38","34","39"],["salto"],true],["SALTO MARIOTTA ELETTRA PRATA","8301","1e8b62_de8d22bff5604931bd84c4d13d5eb08b~mv2.png",["35","36","37","38","34","39"],["salto"],true],["SALTO  MARIOTTA II (PRETO )","8294","1e8b62_390c752b1e3948d491ef32fe3bb94d52~mv2.png",["37","38","34","39"],["salto"],true],["SALTO  MARIOTTA II (CARAMELO )","8287","1e8b62_6986a57e44004408a50a826c7eb1f0d5~mv2.png",["35","36","37","38","34","39"],["salto"],true],["SALTO  MARIOTTA II (DOURADO)","8280","1e8b62_29767ab622794e38b4429c7aa3125969~mv2.png",["36","37","39"],["salto"],true],["SCARPIN MARIOTTA  (PRETO)","8266","1e8b62_e8ab420fb5f543d192ef38d1f63b46e0~mv2.png",["34","35","36"],["salto"],true],["SCARPIN MARIOTTA  (NUDE)","8273","1e8b62_1d52256b69794c818e845c7da403919d~mv2.png",["35","38","39"],["salto"],true],["ANA BELA MARIOTTA  ( CARAMELO )","8259","1e8b62_dd5b00cfb21f4ec3be5f088da8e4c48b~mv2.png",["35","36","37","38","34","39"],["salto"],true],["SALTO CHAMPAGNE MARIOTTA","8252","1e8b62_874c5d81d9dd429b9b90fd7b9a0a53b7~mv2.png",["35","36","37","38","34","39"],["salto"],true],["SALTO OFF MARIOTTA","8245","1e8b62_71d781aa101a460aa2eadf17bf2051fd~mv2.png",["37","38","39"],["salto"],true],["SALTO DOURADO MARIOTTA","8238","1e8b62_d08e2d44f43041b4ae1384fd03267a38~mv2.png",["35","36","37","38"],["salto"],true],["ANA BELA MARIOTTA  ( PRETA )","8224","1e8b62_d55291d1b4224586bc3c5f248f933746~mv2.png",["36","37","38","34","39"],["salto"],true],["SALTO FESTA MARIOTTA  ( DOURADO )","8231","1e8b62_e146cbecfa1c461d80d78f5e0d143670~mv2.png",["35","36","38","34"],["salto"],true],["SALTINHO MARIOTTA  ( CAFÉ )","8217","1e8b62_00b1eb755b5a454399b98766a816ae25~mv2.png",["38","34"],["salto"],true],["SALTO MARIOTTA PLUS ( PRETO )","8210","1e8b62_da4bdf5981314de4a6f59755f154a75e~mv2.png",["37"],["salto"],true],["SALTO MARIOTTA PLUS ( OFF)","8196","1e8b62_3e1093eb76944174b0f2aa381c912d9f~mv2.png",["38"],["salto"],true],["NIKE ZOOM X ( PRETO )","8175","1e8b62_1cef14a128084ab8bf694e9c92d2feab~mv2.png",["34","35"],["tenis"],true],["CHINELO AREZZO ( PRETO)","8160","1e8b62_c1c8a5e7519843b0b6c90530c4444bf3~mv2.jpg",["33/34","39/40"],["chinelo"],true],["CHINELO AREZZO ( CAPUCHINHO )","8170","1e8b62_cdcdc01eebc64d6487aa56414ae6e0d5~mv2.jpg",["37/38","39/40"],["chinelo"],true],["SCHÜTZ X ( PRETO)","8139","1e8b62_ab3013d9dc664bf1894941afe991a689~mv2.png",["35"],["rasteira"],true],["ADIDAS LIGHTSTRIKE PRO LILÁS","8118","1e8b62_d566cacd47fc4ebea6b30b4880802797~mv2.png",["35"],["tenis"],true],["NIKE ZOOM X ( ROSA )","8090","1e8b62_0792f127e0c2488a91b7d2408b00fe72~mv2.jpg",["37"],["tenis"],true],["TAMANCO TAIS (AMEIXA )","8041","1e8b62_e2a92c2c895c4a4d87ca450e808540c2~mv2.jpeg",["35","36","37","38","39"],["salto"],true],["SANDÁLIA GISELE (OURO )","8006","1e8b62_1a4f9b65aea74115907dc270d4d86ef8~mv2.png",["35","36","38","34","39"],["salto"],true],["ANA BELA ACRILICO","7880","1e8b62_146e6d73ec2e4a14ab4973d81d355aba~mv2.jpeg",["35","36","34"],["salto"],true],["ANA BELA PITAYA ( VERMELHO)","7887","1e8b62_2dd4ba83129745d0a5f33c931a8eeaf7~mv2.jpeg",["35","36","37","34"],["salto"],true],["ANA BELA PITAYA ( OURO)","7894","1e8b62_f8195ef6c97c4976a39e7843e5d906b7~mv2.jpeg",["35","36","38","34","39"],["salto"],true],["TAMANCO LAÇO( OURO )","7929","1e8b62_c88eaed41407477b8512033e4db52ac7~mv2.jpeg",["35","36","37","34"],["salto"],true],["TAMANCO LAÇO ( CARAMELO )","7936","1e8b62_9e60c95d3fd74ea8a3ec2c0db9051219~mv2.jpeg",["38","34"],["salto"],true],["TAMANCO LAÍS ( MARSALA )","7971","1e8b62_6a8b4f062c0b42a58b1aba6af1112e6f~mv2.jpeg",["35","36","34","39"],["salto"],true],["TAMANCO LAÍS ( OURO )","7978","1e8b62_fd6e7035102d4c6789a8d1e5f05568b8~mv2.jpeg",["39"],["salto"],true],["TAMANCO TAIS ( OURO )","7985","1e8b62_01debfdf2bde436b94f4e49d75b13aa6~mv2.jpeg",["35","34"],["salto"],true],["TAMANCO TAIS (CARAMELO )","7999","1e8b62_a97d2e5c3c8b474eaedc1a48be257c54~mv2.jpeg",["39"],["salto"],true],["SANDÁLIA MINIMALISTA (OURO )","8013","1e8b62_601b73a9ed4145f786e9cd7adfdde099~mv2.png",["35","36","38","34","39"],["salto"],true],["SANDÁLIA MINIMALISTA (CARAMELO )","8020","1e8b62_b229726e8dcd4472891aff4470e74755~mv2.png",["35","36","37","38","34","39"],["salto"],true],["SANDÁLIA MINIMALISTA (PRETRO )","8027","1e8b62_60b132b14cb1461f9e4cd080aa070f2c~mv2.png",["35","36","37","34","39"],["salto"],true],["SANDÁLIA MINIMALISTA (MARSALA )","8034","1e8b62_e7e1c0afebdb46aeb6cd937cd6e8e535~mv2.png",["35","36","37","34","39"],["salto"],true],["Tênis ADIDAS SAMBA (CARAMELO)","7866","1e8b62_0edf7a4f395a4713be5c1a80386ed0a2~mv2.png",[],["tenis"],false],["SALTO MADRI","7862","1e8b62_707b526ffaed4fc0a99bfa68cf7d452d~mv2.png",["37"],["salto"],true],["Tênis Nike ( CINZA PRETO)","7848","1e8b62_6bced12babc848139839b416b5a01758~mv2.png",["35"],["tenis"],true],["Tênis Nike ( OFF)","7841","1e8b62_b45e68276c424f13a28afe7d084bbda3~mv2.png",["34"],["tenis"],true],["SALTO CRISTAL PRETO  LUMEN","7820","1e8b62_0834640d54b44f2b9a557dd45ec67506~mv2.png",["34"],["salto"],true],["SALTO CRISTAL OFF  LUMEN","7827","1e8b62_aa05bfa3134645b3958eb6840b92c479~mv2.png",["35","37","39"],["salto"],true],["TAMANCO BICO FOLHA LUMEN ( OFF )","7799","1e8b62_409b3bae33d64e5caa94b88eeefa2591~mv2.jpeg",["35"],["salto"],true],["SALTO CRISTAL LUMEN","7806","1e8b62_5dc5df104187490f9e6345e4d87ad673~mv2.png",["35","36","37","34","39"],["salto"],true],["CHINELO SLIDE LV ( OFF)","7785","1e8b62_0b4a0f53a1464302ba6c9393f34b79f3~mv2.jpeg",["37","38"],["chinelo"],true],["CHINELO SLIDE LV (PRETA)","7792","1e8b62_348adc5dbe23495ba396fd3d2babb3f3~mv2.jpeg",["34","37"],["chinelo"],true],["Rasteira LOGO ( OFF)","7778","1e8b62_6c4c267c9e4d4272b68979e95f1f5b3c~mv2.png",["35","36","37","39"],["rasteira"],true],["Rasteira MEDALHA","7743","1e8b62_a51378dc873240cea3cd04b7746d0fbb~mv2.png",["37","38","39"],["rasteira"],true],["Rasteira CARMEL","7757","1e8b62_2f4e92acc374460bbaa2dd0f77cdb58c~mv2.png",["35","39"],["rasteira"],true],["Rasteira FIO (PRATA)","7722","1e8b62_48afc3f5b2ff4a4d9e47f62fb275e443~mv2.png",["37"],["rasteira"],true],["Rasteira FIO (OURO )","7729","1e8b62_055456ff4dbe4b1ea458a41f99c125df~mv2.png",["37","38"],["rasteira"],true],["Rasteira FIO (CARAMELO )","7736","1e8b62_5fd5c15d271e436c99c0b04f9573d115~mv2.png",["38","39"],["rasteira"],true],["SALTINHO VICTORIA ( OURO )","7715","1e8b62_c2f67bf2e6204a6e995d8044196d9930~mv2.png",["39"],["salto"],true],["TAMANCO BLOCO BAIXO ( PRATA)","7680","1e8b62_9bca0d4d0d22428bb4b031d422da61f9~mv2.png",["36","37"],["salto"],true],["TAMANCO BLOCO ( OFF)","7694","1e8b62_73d329d3820c4cb59cb7d4c3e04ab14c~mv2.png",["39"],["salto"],true],["TAMANCO BLOCO ( CARAMELO )","7701","1e8b62_e6df9aabbe8844ba97d68cb0be734da1~mv2.png",["37","39"],["salto"],true],["TAMANCO BLOCO ( PRETO )","7708","1e8b62_68560011ac3743f9baf538f65f9bacd6~mv2.png",["38"],["salto"],true],["Rasteira Schütz FIO (OFF)","7626","1e8b62_58f42fec7c094b42a1f1120f64e798eb~mv2.png",["38"],["rasteira"],true],["TÊNIS NIKE ZOOM (OFF )","7605","1e8b62_e1cc25765b34451d882f74ed75fffc5f~mv2.png",["34"],["tenis"],true],["SALTO DEDINHO LUMEN (caramelo)","7577","1e8b62_673f402eed784c218138e2dd8f2c4b2b~mv2.png",["35","37","39"],["salto"],true],["SALTO LUXO LUMEN (caramelo)","7584","1e8b62_e284c9af7f44401e94f8d5aa89cb1f0c~mv2.png",["37"],["salto"],true],["SALTINHO TRAÇA  (caramelo)","7591","1e8b62_6e8625e2564b4126b56d501589695caf~mv2.png",["37"],["salto"],true],["Tênis NEW BALANCE  ABZORB (cinza)","7536","1e8b62_c0a5892a847042679f874e4d5f060a1f~mv2.png",["34"],["tenis"],true],["Scarpin Salto  (preto)","7482","1e8b62_dfe11356ee004774b7b59c766d558434~mv2.png",["34","35","39"],["salto"],true],["Scarpin Salto  (caramelo)","7489","1e8b62_a83859096965420ea92d4688afd9ef54~mv2.png",["34","37","39"],["salto"],true],["Scarpin Cristal (preto)","7503","1e8b62_0daeddbefbdd49e0bcce41c9cff430f6~mv2.png",["35","37"],["salto"],true],["Sandália Gisele (CARAMELO) 1988","7433","1e8b62_66a5430235224613a0f2a6c528b46eca~mv2.png",["35","36","37","39"],["salto"],true],["Sandália Gisele (Caramelo)","7440","1e8b62_4dec94ebca544c3c8962bfb42a6c6111~mv2.png",["38","39"],["salto"],true],["Sandália Gisele (late)","7454","1e8b62_5775f75e10504e5aa8be7b66eae25dba~mv2.png",["34","35","36","38"],["salto"],true],["Sandália Gisele (cafe)","7461","1e8b62_f92dd23d519c40be843a62df28e10f6e~mv2.png",["35","37","39"],["salto"],true],["Sandália Dedinho  (caramelo)2547","7405","1e8b62_12faa9fc380a4fc88aee2238584194ed~mv2.png",["38","39"],["salto"],true],["Sandália Di Valentini (preta)2816","7391","1e8b62_e46c3441cebe445ca4e886b840f925fb~mv2.png",["34","37","39"],["salto"],true],["Sandália Di Valentini (caramelo)2816","7398","1e8b62_7e48f31abd3b4131987eccd5a100481c~mv2.png",["36","37","38","39"],["salto"],true],["Sandália Di Valentini (marrom)2708","7377","1e8b62_ee8aa0b754d44148b853136a55eead1d~mv2.png",["37"],["salto"],true],["Sandália Di Valentini (off)2708","7384","1e8b62_bfae7ef69aa549b0b3f1bfdbc9175380~mv2.png",["39"],["salto"],true],["Sandália Gisele (caramelo) 2172","7349","1e8b62_3432d786366a4b5ba9776bb667b519ea~mv2.png",["37","38"],["salto"],true],["Tênis NB 9060 (Branco/rosa)","7272","ae34e2_56677dd966a64847b2810b94b7d5679d~mv2.jpg",["34","35","37","38"],["tenis"],true],["BOTA MARIOTTA ( BEGE )","7211","1e8b62_1a274ba55e604ee59f7549d2b8e7eb62~mv2.png",["34","37"],["bota"],true],["BOTA MARIOTTA ARGOLA","7218","1e8b62_c68d43049fc2469fa3984e8996de5443~mv2.png",["34","36","37"],["bota"],true],["BOTA MARIOTTA  ( CAFÉ )","7225","1e8b62_05009c59f53d491ab11671c41458a39e~mv2.png",["34","35","36"],["bota"],true],["BOTA MARIOTTA  ( PRETA )","7232","1e8b62_f2f1e60a3c2742608011518ea11ff56f~mv2.png",["34","36","37"],["bota"],true],["Chinelo GUCCI ( MARON)","7197","1e8b62_5cf297d0141443b4a608e8bee3c726bf~mv2.jpeg",["34"],["chinelo"],true],["NUVEM ( BRANCA)","7159","1e8b62_3285b4d4d81b48ac9ed025643d1cec06~mv2.jpeg",["36"],["nuvem"],true],["NUVEM (PRETA )","7166","1e8b62_81a15ef352c74d7f8a41470400f0fab0~mv2.jpeg",[],["nuvem"],false],["NUVEM (SALMAO )","7173","1e8b62_ab3e23675ecd4f139b92c169e68dabd1~mv2.jpeg",["36","37"],["nuvem"],true],["SANDÁLIAS FLARE ( PRETO )","7069","1e8b62_cf38962d31d24bb7be1eae3e479914a7~mv2.png",["35"],["salto"],true],["SANDÁLIAS FLARE ( PRATA )","7076","1e8b62_8147db66598d4d8bbf1200cbc73e4ed9~mv2.png",["34","35","39"],["salto"],true],["SANDÁLIAS FLARE ( OURO )","7083","1e8b62_8861a7aa87b34aa693c73166ee8dcb9e~mv2.png",["34","38","39"],["salto"],true],["Tênis NB 9060 ( vinho )","7002","1e8b62_1de74238d1054838aff066fe85e3b47d~mv2.png",["34","35"],["tenis"],true],["Chinelo Virgínia ( AMARELO )","6958","1e8b62_55bbaabcc6844263a9edf7160b8e4f6b~mv2.jpeg",["33/34","39/40"],["chinelo"],true],["Chinelo Virgínia ( AZUL )","6963","1e8b62_a4e6bec3d60e4312b07c39502f4b1862~mv2.jpeg",["33/34","39/40"],["chinelo"],true],["AREZZO BRASIL ( CAFE)","6819","1e8b62_bbbec6c2f3184ed5ae2c8b984c17db6c~mv2.jpeg",["33/34"],["chinelo"],true],["AREZZO BRASIL ( PRETO)","6814","1e8b62_4a3413e3ca4c4a01bee3fe46e566891a~mv2.jpeg",["33/34","39/40"],["chinelo"],true],["AREZZO BRASIL ( OFF)","6809","1e8b62_87abec4870d94608b82ca874250c48d0~mv2.jpg",["33/34","39/40"],["chinelo"],true],["Rasteira Schutz Cobra (ouro)","6760","1e8b62_e30007d3397246d1b11398e656bcf775~mv2.png",["34","35","36","37","38","39"],["rasteira"],true],["Rasteira Schutz Cobra (prata)","6753","1e8b62_5e3e1249df124e5f8117eadfeeccac77~mv2.png",["34","35","36","37","38","39"],["rasteira"],true],["TÊNIS SCHUTZ 001","6746","1e8b62_87a52adc21d648d990b0a52dd5ac2c76~mv2.png",["34"],["tenis"],true],["TÊNIS SCHÜTZ II ( PRETO)","6698","1e8b62_7f2b6163625c483e9002c930a3fe260f~mv2.png",["35"],["tenis"],true],["RASTEIRA SCHUTZ X (PRETO)","6581","ae34e2_198f1e74cb6b4fdbac4134608dec44b6~mv2.jpg",["35"],["rasteira"],true],["RASTEIRA SCHUTZ X (OFF)","6588","ae34e2_3043b28b14ac4c2eb1a4240165430f77~mv2.jpg",["35","36"],["rasteira"],true],["RASTEIRA PENA (OURO)","6664","1e8b62_a7ef461484cc47ce952abfd98085eba8~mv2.png",["37/38","39/40"],["rasteira"],true],["RASTEIRA TROPICAL (PRATA)","6610","1e8b62_b44b327eb8be453889e12340d1da88ef~mv2.jpeg",["35"],["rasteira"],true],["RASTEIRA H (OURO)","6626","1e8b62_da5205a915a742ce891eb3ec07104caf~mv2.jpeg",["39"],["rasteira"],true],["RASTEIRA GOLD (PRATA)","6645","1e8b62_9e92c29509e24652940761f8d67beec5~mv2.jpeg",["36"],["rasteira"],true],["Chinelo Virgínia ( PRETA )","6522","1e8b62_bf499d0f7f5445a48197bbdc341da6d0~mv2.jpeg",["33/34","39/40"],["chinelo"],true],["Chinelo Virgínia ( MAROM )","6527","1e8b62_5c1ead570d3c4285b5b3c1f4e0d291d4~mv2.jpeg",["33/34"],["chinelo"],true],["Chinelo Virgínia ( OFF)","6532","1e8b62_9e5388dfae0543f694cda67193fee8b4~mv2.jpeg",["33/34","39/40"],["chinelo"],true],["Tênis NIKE ( OFF)","6489","1e8b62_69e89e26ded84a1d896d08db3cdbb1a8~mv2.png",["38"],["tenis"],true],["Rasteira Fivela (off)","6502","1e8b62_cd73544d7d4d417e940212b6ba6c07e4~mv2.jpeg",["35","37","38","39"],["rasteira"],true],["Rasteira FIVELA ( CARAMELO)","6511","1e8b62_65d1d33fdfef44c7a5f58b3ad4380ed7~mv2.jpeg",["37","38"],["rasteira"],true],["Rasteira FIVELA ( PRATA)","6516","1e8b62_354e0b2053e24a68983c37645c1e0703~mv2.jpeg",["35","37","39"],["rasteira"],true],["Salto DI VALENTINI 11236 ( TELHA)","6430","1e8b62_1c66cefbc5d44b6986acdd7d869a1e0e~mv2.png",["34","35","36","38","39"],["salto"],true],["Salto DI VALENTINI 11236. ( DIJON )","6437","1e8b62_1563dddf1569419da94d4e44f1dbf5c0~mv2.png",["34","36","37","38","39"],["salto"],true],["Chinelo Arezzo Brizza ( OFF )","6400","1e8b62_4b2c8405a9ca49c9930e685d33239a2c~mv2.jpeg",["33/34","39/40"],["chinelo"],true],["Chinelo Arezzo Brizza ( Café)","6405","1e8b62_d1033e2b785a4c5f95bc0e3c4682de41~mv2.jpeg",["33/34","39/40"],["chinelo"],true],["Chinelo Arezzo Brizza (Preto)","6410","1e8b62_3fd5149d47a142b8957ccab92dc8dd50~mv2.jpeg",["33/34"],["chinelo"],true],["Rasteira Couro ( OFF)","6259","1e8b62_d0ae32b7d22b4458bdb2a58255d60317~mv2.jpeg",["39"],["rasteira"],true],["RASTEIRA LUXO (AMARRAÇÃO)","6175","1e8b62_2e216f16955d4bd9b260f3b9e1cee52a~mv2.png",["34"],["rasteira"],true],["RASTEIRA LUXO (GLADIADORA)","6189","1e8b62_a611c82aa58f476ba72aeb3fa2435c0f~mv2.jpeg",["38"],["rasteira"],true],["RASTEIRA LUXO (ELO)","6100","1e8b62_8902f10733ac4fc4a0fd9c4396562c0a~mv2.jpeg",["39"],["rasteira"],true],["PAPETE CARIBE (OFF)","5951","1e8b62_cd7f27d5a9b84fff80cc5f652b6c915f~mv2.jpeg",["34","39"],["papete"],true],["Rasteira Schutz Clássica (nude)","6457","1e8b62_6ac944d43ec54b4f99aed6cb26804ed2~mv2.jpeg",["40"],["rasteira"],true],["PAPETE BIRKEN GUCCI (GUCCI)","5905","1e8b62_9bc4183a1b7c408fb91e81270fabd95c~mv2.jpeg",["34/35"],["papete"],true],["SLIDE LOUIS  (AZUL)","5818","1e8b62_727ca5ae157f4285ab08182e241ac5ac~mv2.jpeg",["35","36","38"],["papete"],true],["RASTEIRA MIU MIU (OURO)","5784","1e8b62_b219a643367146688b569f12e2e9b799~mv2.png",["38"],["rasteira"],true],["Chinelo Schutz (OFF)","5701","1e8b62_bd3b219c10124137aa13a3fe339facea~mv2.jpeg",["39/40"],["chinelo"],true],["DIVALENTINI 5409 (PRETO)","6209","1e8b62_e0dc56d121cc472c977e5241fc124b32~mv2.png",["38"],["salto"],true],["DIVALENTINI 5409 (PRATA )","5570","1e8b62_0be5b0f3cad348c480f9e973ed5f1074~mv2.png",["38"],["salto"],true],["DIVALENTINI 5406 (PRATA)","5602","1e8b62_770f6b34aede438f92a1f06b571c128e~mv2.png",["36","37","38","39"],["salto"],true],["SCARPIN (PRETO)","5427","1e8b62_22c9b2756b2546eeac55bad1bfe3ce3d~mv2.png",["34"],["salto"],true],["RASTEIRA TÓQUIO (CARAMELO)","5406","1e8b62_abe349c11ca448568c6911a7f0a1936e~mv2.png",["34","35","36","38"],["rasteira"],true],["RASTEIRA BOUTIQUE (NUDE)","5139","1e8b62_5b29e532f3e84a9d99ac316ab39998dc~mv2.jpeg",["36"],["rasteira"],true],["RASTEIRA BOUTIQUE (PRATA)","5144","1e8b62_6165eb1d0a8a426b8432050ba0de91db~mv2.jpeg",["36"],["rasteira"],true],["RASTEIRA BOUTIQUE 02 (PRATA)","5158","1e8b62_f803ec492dfe41a0979e3ad2e7b9fba2~mv2.jpeg",["34","35"],["rasteira"],true],["RASTEIRA BOUTIQUE 02 (CARAMELO)","5173","1e8b62_87414bfa8bbf45ea9076b9e05830295c~mv2.jpeg",["38","39"],["rasteira"],true],["RASTEIRA BOUTIQUE 02 (NUDE)","5181","1e8b62_64f140edc8b34d1e9d33d86ed3d5ad41~mv2.jpeg",["36","38"],["rasteira"],true],["PAPETE DOLORES  (CAFÉ )","5118","1e8b62_bb8e204c26ca44008b3ddfd41b0ba7ce~mv2.png",["34","35","36","37","38","39"],["papete"],true],["PAPETE DOLORES  (OFF )","5125","1e8b62_349abb5d211f483b843c981142c91204~mv2.png",["34","35","36","37","38"],["papete"],true],["SANDÁLIA SALTO THAY (PRETO)","5076","1e8b62_9ec5673bfa15453fbcc5d07b7fb871f1~mv2.png",["36","37","38"],["salto"],true],["SANDÁLIA SALTO GREGORIA  (CAFE)","5084","1e8b62_2d88b330e4de45d99e6515629e9b08f2~mv2.png",["35","36","38","39"],["salto"],true],["SANDÁLIA SALTO GREGORIA  (OFF)","5090","1e8b62_1cc06d665ca440fcb1c7725d68c34e8f~mv2.png",["34","35","36","38"],["salto"],true],["SANDÁLIA SALTO VOP  (MOUSE)","5106","1e8b62_1028e7b8e6884d6488ed2ef94ebb76cb~mv2.png",["38"],["salto"],true],["TAMANCO SALTO LORES  (ÂMBAR )","5111","1e8b62_2b77454a95e942d29b2d97f58c652a61~mv2.png",["35","36","37","38","39"],["salto"],true],["FALT BLOCO  (PRETA)","5015","1e8b62_8a61968bd5114b71bc8aae1730c3a566~mv2.png",["38","39"],["papete"],true],["RASTEIRA ELOAH  (PRETA)","5049","1e8b62_c81cb62d44ab4e46ac1488dc45a5228c~mv2.png",["35","38"],["rasteira"],true],["RASTEIRA AREZZO (ONCINHA)","5063","1e8b62_2f08cb55637f4e8ab220b4202c4c548b~mv2.png",["35","38"],["rasteira"],true],["Chinelo Arezzo ( cafe )","6676","1e8b62_ad3cc7ec5f224ea7b9a08da9a4aa76a1~mv2.jpeg",["33/34"],["chinelo"],true],["Chinelo Arezzo ( off )","6672","1e8b62_00bc3ecfb8ad46428ce5f43f8643b8e5~mv2.jpeg",["39/40"],["chinelo"],true],["Tamanco Elani  ( café )","4834","1e8b62_f6859296b9864fb8b4e3d0dbb7e60c45~mv2.png",["39"],["salto"],true],["Tamanco Arací  ( cafe )","4811","1e8b62_14e9c70bf1084defbc2c5fc318ec5a02~mv2.png",["35","37","38"],["salto"],true],["Tamanco Arací  ( off )","4818","1e8b62_e1d030bdbddd4e51b4506f362687dcfe~mv2.png",["35","37","38","39"],["salto"],true],["Rasteira Vick  ( cafe )","4761","1e8b62_f47bafc892234ff285ab47addeb7d480~mv2.png",["34"],["rasteira"],true],["Rasteira Vick ( off )","4768","1e8b62_cc06aedf0c1a4c8380155b460438fd68~mv2.png",["34","36","38"],["rasteira"],true],["Rasteira Bell ( off )","4776","1e8b62_b3700af6dc7f460d8086e43008b26cb4~mv2.png",["35","36","39"],["rasteira"],true],["Rasteira Bell ( caramelo )","4782","1e8b62_fcc57f9c141e45028bbe932000bdc0e7~mv2.png",["34","35","36","37","38"],["rasteira"],true],["Rasteira Bell ( musgo )","4790","1e8b62_45a56e5c00d24073b16114d20cc9821c~mv2.png",["35","36","38"],["rasteira"],true],["PAPETE COURO ( CARAMELO)","4719","1e8b62_0eef06e9d21d43e7883cd5c2f8227572~mv2.jpeg",["35"],["papete"],true],["PAPETE COURO ( ANIMAL PRINTE )","4726","1e8b62_cf069b4f53314a94b113503dd6ab01c5~mv2.png",["34"],["papete"],true],["Salto EUDORA ( AVEIA )","4561","1e8b62_967e5613d06949dcb2ab0dac341ccce6~mv2.png",["35","36","37","38","39"],["salto"],true],["SALTO EUDORA ( PRETO)","4567","1e8b62_f0774c9b5962467a85bce842917a403d~mv2.png",["34","35","36","38","39"],["salto"],true],["SALTO EUDORA ( CAFÉ )","4574","1e8b62_bb15ecdd93c74f64bc352143dd8dadf6~mv2.png",["34","35","36","37","39"],["salto"],true],["SALTO JASPIRA ( OURO)","4581","1e8b62_a8e53239b09247899782e860f6a36fa8~mv2.png",["34","36","38"],["salto"],true],["SALTO JASPIRA ( PRATA )","4590","1e8b62_67c91291c1bf442a878e88c9687e7046~mv2.png",["36","37","38"],["salto"],true],["SALTO JASPIRA ( OFF)","4595","1e8b62_9187ff33d266453bb37ced0f8c61e413~mv2.png",["34","35","36","37","38","39"],["salto"],true],["SALTO MIDIAN ( OFF)","4603","1e8b62_c134d284af154836bed94b16d22260ed~mv2.png",["36","37","39"],["salto"],true],["SALTO MIDIAN ( ARMY )","4609","1e8b62_009b4edc36f94f3c8a5f8dca3221de01~mv2.png",["34","35","36","37","38","39"],["salto"],true],["SALTO NAIA ( CARAMELO)","4616","1e8b62_276fd7acb20f45ad8247ec35a8141695~mv2.png",["35","36","38","39"],["salto"],true],["SALTO LEONOR ( MARSALA )","4490","1e8b62_c5c3716ccb224a4e96b16cdc214832d0~mv2.png",["34","35"],["salto"],true],["SALTO LIGHT (PRATA )","4527","1e8b62_0cdfdae691594cacb56b023903c5cf3f~mv2.png",["36"],["salto"],true],["Chinelo Schutz Logo ( Preta)","6684","1e8b62_39425fbf0c2241c28bd79ebaa0565395~mv2.jpg",["33/34","39/40"],["chinelo"],true],["Chinelo Schutz Logo ( OFF )","5690","1e8b62_2aadb26f241043e795434b4c58cd0979~mv2.jpg",["33/34","39/40"],["chinelo"],true],["Tamanco Bico Folha (caramelo)","4347","1e8b62_93e26e58ca094d78875a45720d25be10~mv2.png",["38"],["salto"],true],["Tamanco Salto Fino ( Café )","4367","1e8b62_4aee9a324ff84506b496c74251a30f0b~mv2.png",["36"],["salto"],true],["Tamanco Salto Fino ( Caramelo)","4373","1e8b62_42b3f87da4d8424d8676b7f37f447e47~mv2.png",["36"],["salto"],true],["Salto Madri","4401","1e8b62_d9cd164c0c6b409da3afdd5ccde795a7~mv2.png",["34","35"],["salto"],true],["Salto Madri ( Café )","4408","1e8b62_2c8bbf07087142c8b3e52a8a5533eaf9~mv2.png",["35","36"],["salto"],true],["Salto V ( Preto )","4417","1e8b62_818cfb44ffa94e0193638390044e2e6a~mv2.png",["38"],["salto"],true],["Salto V (OFF )","4424","1e8b62_7ca0596427bc4f2d924a4db01b53ef4a~mv2.png",["38","39"],["salto"],true],["Salto Gold","4441","1e8b62_d3b4ac2bfb624586abdb257a61311f80~mv2.png",["34"],["salto"],true],["Sandália Salto Baixo MRTT (off)","4271","1e8b62_0f5ade9354c844b8a43df8e583a75b95~mv2.png",["39"],["salto"],true],["Sandália de dedo salto fino  MRTT (off)","4280","1e8b62_27d437c03600435d8d885401822e88f5~mv2.png",["34","35","39"],["salto"],true],["Bolsa Balada (caramelo)","4197","1e8b62_c3bd5704cfeb4990ac3c03259424c679~mv2.jpeg",[],["bolsas"],true],["Bolsa Balada (preta)","4198","1e8b62_2731a2e4ee5f4a38bf55b1234d29d468~mv2.jpeg",[],["bolsas"],true],["Papete Couro (cafe)","4152","1e8b62_588055cead7f4a8689096290d3d90c57~mv2.png",["35","37","38"],["papete"],true],["Papete Couro (preta)","4158","1e8b62_81662cd57c804e92b7fdec9fdc3ba283~mv2.png",["35","36","37","38","39"],["papete"],true],["Salto Fino E Calcanhar Fechado MRTT (preta)","4044","1e8b62_db0ae5780e5c4f7fbce08d31aadd4b99~mv2.png",["35","38"],["salto"],true],["Salto Croco (café)","3960","1e8b62_83956b3404394257b824d5c9b7e4aafb~mv2.png",["39"],["salto"],true],["Salto Croco (off)","3963","1e8b62_da83b080d9604cb59de24bfab0b324f2~mv2.png",["34"],["salto"],true],["Salto Allm (caramelo)","3808","1e8b62_e81bb4406d6f4388bccafeaaf1ff4883~mv2.png",["34","35","38"],["salto"],true],["Havaiana Bohô (off)","3818","1e8b62_7b3bec62efe44bb388067410e9bccb89~mv2.jpeg",["39/40"],["chinelo"],true],["Salto Fino E Calcanhar Fechado MRTT","3539","1e8b62_d3363506a89e4b8e8492233d91f07b12~mv2.png",["38"],["salto"],true],["Salto Fino Baixo Fivela De Strass","3557","1e8b62_2fc3585e8de84e04a49a447d82fa50a8~mv2.png",["35"],["salto"],true],["Sandália Essenza MRTT (Café)","3636","1e8b62_d329fe1849d5411bac18a14731972953~mv2.png",["37","38"],["salto"],true],["Chinelo Arezzo (off)","2569","1e8b62_c24b958c17264a89b4eff88e52826a30~mv2.jpeg",["33/34","39/40"],["chinelo"],true],["Havaianas Olho Grego (lilás)","2488","1e8b62_e9aec5f2ca8747c88546d0fcd3667f70~mv2.jpeg",["39"],["chinelo"],true],["Colcci Pandora (preta)","2336","1e8b62_205be130650e460d8b278c8ea67dfe0b~mv2.jpeg",["39/40"],["chinelo"],true],["Chinelo Farm (carnavalha)","2285","1e8b62_9edad100b5884efbbb36c24e8d497366~mv2.jpeg",["39/40"],["chinelo"],true],["Salto Acrílico (pala caramelo)","1849","1e8b62_1e7b6931f84e496c8274f21d15e23195~mv2.png",["38"],["salto"],true],["Papete Birken Gringa  (ouro)","1814","1e8b62_1896a707f7444016ad217b78b1e0636d~mv2.jpg",["38"],["papete"],true],["Papete Birken Gringa  (caramelo)","1819","1e8b62_7b182408d0664a02be9a9dd95e7952b7~mv2.jpg",["36","38"],["papete"],true],["Papete Flor (preta)","909","1e8b62_92c2db5eb6c14016a7f4d469cc8556bd~mv2.png",["35","38"],["papete"],true],["Rasteira Schütz (Nude)","1327","1e8b62_6bf12ebec536427d84be49766b4491e9~mv2.jpg",["40"],["rasteira"],true],["Saltinho Mari","509","1e8b62_eba09d73eb8b4175b798f263494def15~mv2.png",["34"],["salto"],true],["Arezzo Pedras (Caramelo)","394","1e8b62_f9913cd68a7c4a3486aa2afd187fd230~mv2.png",["38"],["papete"],true],["Bolsa Original Premium","52","1e8b62_29168ed05a5c4952aabf5b6215a878f3~mv2.jpg",[],["bolsas"],true],["Rasteira Aspiral","240","1e8b62_014b23c45bb741f9a65213781673cd7f~mv2.jpg",["38"],["rasteira"],true]];
 const productPaths={"52":"/product-page/bolsa-original-premium-2","240":"/product-page/rasteira-aspiral","394":"/product-page/papete-arezzo-pedras-2","509":"/product-page/saltinho-mari","909":"/product-page/papete-flor-preta","1327":"/product-page/rasteira-schütz-nude","1814":"/product-page/papete-birken-gringa-ouro","1819":"/product-page/papete-birken-gringa-caramelo","1849":"/product-page/salto-acrílico-pala-caramelo","2285":"/product-page/chinelo-farm-carnavalha","2336":"/product-page/colcci-pandora-preta","2488":"/product-page/havaianas-olho-grego-lilás","2569":"/product-page/chinelo-arezzo-off","3539":"/product-page/salto-fino-e-calcanhar-fechado-mrtt","3557":"/product-page/salto-fino-baixo-fivela-de-strass","3636":"/product-page/sandália-essenza-mrtt-café","3808":"/product-page/salto-allm-caramelo","3818":"/product-page/havaiana-bohô-off","3960":"/product-page/salto-croco-café","3963":"/product-page/salto-croco-off","4044":"/product-page/salto-fino-e-calcanhar-fechado-mrtt-preta","4152":"/product-page/papete-couro-cafe","4158":"/product-page/papete-couro-preta","4197":"/product-page/bolsa-balada-caramelo","4198":"/product-page/bolsa-balada-preta","4271":"/product-page/sandália-salto-baixo-mrtt-off","4280":"/product-page/sandália-de-dedo-salto-fino-mrtt-off","4347":"/product-page/tamanco-bico-folha-caramelo","4367":"/product-page/tamanco-salto-fino-café","4373":"/product-page/tamanco-salto-fino-caramelo","4401":"/product-page/salto-madri","4408":"/product-page/salto-madri-café","4417":"/product-page/salto-v-preto","4424":"/product-page/salto-v-off","4441":"/product-page/salto-gold","4490":"/product-page/salto-leonor-marsala","4527":"/product-page/salto-light-prata","4561":"/product-page/salto-eudora-aveia","4567":"/product-page/salto-eudora-preto","4574":"/product-page/salto-eudora-café","4581":"/product-page/salto-jaspira-ouro","4590":"/product-page/salto-jaspira-prata","4595":"/product-page/salto-jaspira-off","4603":"/product-page/salto-midian-off","4609":"/product-page/salto-midian-army","4616":"/product-page/salto-naia-caramelo","4709":"/product-page/rateira-leticia-ouro","4719":"/product-page/papete-couro-caramelo","4726":"/product-page/papete-couro-animal-printe","4761":"/product-page/rasteira-vick-cafe","4768":"/product-page/rasteira-vick-off","4776":"/product-page/rasteira-bell-off","4782":"/product-page/rasteira-bell-caramelo","4790":"/product-page/rasteira-bell-musgo","4811":"/product-page/tamanco-arací-cafe","4818":"/product-page/tamanco-arací-off","4834":"/product-page/tamanco-elani-café","5015":"/product-page/falt-bloco-preta","5049":"/product-page/rasteira-eloah-preta","5063":"/product-page/rasteira-arezzo-oncinha","5076":"/product-page/sandália-salto-thay-preto","5084":"/product-page/sandália-salto-gregoria-cafe","5090":"/product-page/sandália-salto-gregoria-off","5106":"/product-page/sandália-salto-vop-mouse","5111":"/product-page/tamanco-salto-lores-âmbar","5118":"/product-page/papete-dolores-café","5125":"/product-page/papete-dolores-off","5139":"/product-page/rasteira-boutique-nude","5144":"/product-page/rasteira-boutique-prata","5158":"/product-page/rasteira-boutique-02-prata","5173":"/product-page/rasteira-boutique-02-caramelo","5181":"/product-page/rasteira-boutique-02-nude","5406":"/product-page/rasteira-tóquio-caramelo","5427":"/product-page/scarpin-preto","5570":"/product-page/divalentini-5409-prata-1","5602":"/product-page/divalentini-5406-prata-1","5690":"/product-page/chinelo-schutz-logo-off-1","5701":"/product-page/chinelo-schutz-off-1","5784":"/product-page/rasteira-miu-miu-ouro","5818":"/product-page/slide-louis-azul","5905":"/product-page/papete-birken-gucci-gucci","5951":"/product-page/papete-caribe-off","6100":"/product-page/rasteira-luxo-elo","6175":"/product-page/rasteira-luxo-amarração","6189":"/product-page/rasteira-luxo-gladiadora","6209":"/product-page/divalentini-5409-preto-1","6259":"/product-page/rasteira-couro-off","6400":"/product-page/chinelo-schutz-logo-off","6405":"/product-page/chinelo-schutz-logo-café-1","6410":"/product-page/chinelo-schutz-logo-preto","6430":"/product-page/salto-di-valentini-11236-telha","6437":"/product-page/salto-di-valentini-11236-dijon","6457":"/product-page/rasteira-schutz-clássica-nude","6489":"/product-page/tênis-nike-off","6502":"/product-page/rasteira-fivela-off","6511":"/product-page/rasteira-fivela-caramelo","6516":"/product-page/rasteira-fivela-prata","6522":"/product-page/chinelo-virgínia-preta","6527":"/product-page/chinelo-virgínia-maron","6532":"/product-page/chinelo-virgínia-off","6581":"/product-page/rasteira-schutz-x-preto","6588":"/product-page/rasteira-schutz-x-off","6610":"/product-page/rasteira-tropical-prata","6626":"/product-page/rasteira-h-ouro","6645":"/product-page/rasteira-gold-prata","6664":"/product-page/rasteira-pena-ouro","6672":"/product-page/chinelo-arezzo-off-1","6676":"/product-page/chinelo-arezzo-cafe","6684":"/product-page/chinelo-schutz-logo-preta","6698":"/product-page/tênis-schütz-ii-preto","6746":"/product-page/tênis-schutz-001","6753":"/product-page/rasteira-schutz-cobra-prata","6760":"/product-page/rasteira-schutz-cobra-ouro","6809":"/product-page/arezzo-brasil-off","6814":"/product-page/arezzo-brasil-preto","6819":"/product-page/arezzo-brasil-cafe","6958":"/product-page/chinelo-virgínia-amarelo","6963":"/product-page/chinelo-virgínia-azul","7002":"/product-page/tênis-nb-9060-vinho","7069":"/product-page/scar-flare-preto","7076":"/product-page/scar-flare-prata","7083":"/product-page/scar-flare-ouro","7159":"/product-page/nuvem-branca","7166":"/product-page/nuvem-preta","7173":"/product-page/nuvem-salmao","7197":"/product-page/chinelo-gucci-maron","7211":"/product-page/bota-mariotta-bege","7218":"/product-page/bota-mariotta-argola","7225":"/product-page/bota-mariotta-café","7232":"/product-page/bota-mariotta-preta","7272":"/product-page/tênis-nb-9060-off","7349":"/product-page/sandália-gisele-caramelo","7377":"/product-page/sandália-di-valentini-marrom","7384":"/product-page/sandália-di-valentini-off","7391":"/product-page/sandália-di-valentini-preta","7398":"/product-page/sandália-di-valentini-caramelo","7405":"/product-page/sandália-dedinho-caramelo","7433":"/product-page/sandália-gisele-caramelo-2","7440":"/product-page/sandália-gisele-caramelo-1","7454":"/product-page/sandália-gisele-late","7461":"/product-page/sandália-gisele-cafe","7482":"/product-page/scarpin-salto-preto","7489":"/product-page/scarpin-salto-caramelo","7503":"/product-page/scarpin-cristal-preto","7536":"/product-page/tênis-new-balance-abzorb-cinza","7577":"/product-page/salto-dedinho-lumen-caramelo","7584":"/product-page/salto-luxo-lumen-caramelo","7591":"/product-page/saltinho-traça-caramelo","7605":"/product-page/tênis-nike-zoom-off","7626":"/product-page/rasteira-schütz-fio-off","7680":"/product-page/tamanco-bloco-baixo-prata","7694":"/product-page/tamanco-bloco-off","7701":"/product-page/tamanco-bloco-caramelo","7708":"/product-page/tamanco-bloco-preto","7715":"/product-page/saltinho-victoria-ouro","7722":"/product-page/rasteira-fio-prata","7729":"/product-page/rasteira-fio-ouro","7736":"/product-page/rasteira-fio-caramelo","7743":"/product-page/rasteira-medalha","7757":"/product-page/rasteira-carmel","7778":"/product-page/rasteira-logo-off","7785":"/product-page/chinelo-slide-lv-off","7792":"/product-page/chinelo-slide-lv-preta","7799":"/product-page/tamanco-bico-folha-lumen-off","7806":"/product-page/salto-cristal-lumen","7820":"/product-page/salto-cristal-preto-lumen","7827":"/product-page/salto-cristal-off-lumen","7841":"/product-page/tênis-nike-off-1","7848":"/product-page/tênis-nike-cinza-preto","7862":"/product-page/salto-madri-1","7866":"/product-page/tênis-adidas-samba","7880":"/product-page/ana-bela-acrilico","7887":"/product-page/ana-bela-pitaya-vermelho","7894":"/product-page/ana-bela-pitaya-ouro","7929":"/product-page/tamanco-laço-ouro","7936":"/product-page/tamanco-laço-caramelo","7971":"/product-page/tamanco-laís-marsala","7978":"/product-page/tamanco-laís-ouro","7985":"/product-page/tamanco-tais-ouro","7999":"/product-page/tamanco-tais-caramelo","8006":"/product-page/sandália-gisele-ouro-2","8013":"/product-page/sandália-minimalista-ouro","8020":"/product-page/sandália-minimalista-caramelo","8027":"/product-page/sandália-minimalista-pretro","8034":"/product-page/sandália-minimalista-marsala","8041":"/product-page/tamanco-tais-ameixa","8090":"/product-page/nike-zoom-x-rosa","8118":"/product-page/adidas-lightstrike-pro-lilás","8139":"/product-page/schütz-x-preto","8160":"/product-page/chinelo-arezzo-preto","8170":"/product-page/chinelo-arezzo-capuchinho","8175":"/product-page/nike-zoom-x-preto","8196":"/product-page/salto-mariotta-plus-off","8210":"/product-page/salto-mariotta-plus-preto-1","8217":"/product-page/saltinho-mariotta-café","8224":"/product-page/ana-bela-mariotta-preta","8231":"/product-page/salto-festa-mariotta-preta","8238":"/product-page/salto-dourado-mariotta","8245":"/product-page/salto-dourado-mariotta-1","8252":"/product-page/salto-champagne-mariotta","8259":"/product-page/ana-bela-mariotta-caramelo","8266":"/product-page/scarpin-mariotta-preto","8273":"/product-page/scarpin-mariotta-nude","8280":"/product-page/salto-mariotta-ii-dourado","8287":"/product-page/salto-mariotta-ii-caramelo","8294":"/product-page/salto-mariotta-ii-preto","8301":"/product-page/salto-mariotta-elettra-prata","8308":"/product-page/salto-mariotta-elettra-ouro","8315":"/product-page/salto-mariotta-42694-ouro","8336":"/product-page/chinelo-arezzo-caramelo","8346":"/product-page/chinelo-arezzo-off-3","8351":"/product-page/tênis-adidas-samba-off-preto","8379":"/product-page/tênis-adidas-adizero-rosa","8386":"/product-page/tênis-adidas-rosa","8393":"/product-page/tênis-adidas-pink","8400":"/product-page/new-9060-off-canela","8407":"/product-page/new-9060-off-rosa","8488":"/product-page/brizza-arezzo-square-at-off","8493":"/product-page/brizza-arezzo-square-at-preto","8498":"/product-page/flatform-brizza-arezzo-capuchinho","8503":"/product-page/flatform-brizza-square-marsala","8508":"/product-page/flatform-brizza-square-café","8513":"/product-page/flatform-brizza-square-off","8523":"/product-page/flatform-brizza-square-preta","8542":"/product-page/salto-fino-bebece-off","8549":"/product-page/salto-fino-bebece-preto","8556":"/product-page/nike-fit-off-cafe","8570":"/product-page/nike-fit-off-caramelo","8591":"/product-page/tênis-nb-9060-off-cafe","8605":"/product-page/tênis-nb-9060-off-azul","8612":"/product-page/plataforma-gucci-off","8668":"/product-page/nuvem-brizza-arezzo-preto","8672":"/product-page/nuvem-brizza-arezzo-branco","8676":"/product-page/nuvem-brizza-arezzo-caramelo","8680":"/product-page/brizza-arezzo-off","8684":"/product-page/brizza-arezzo-preto","8688":"/product-page/brizza-arezzo-branco","8700":"/product-page/adidas-boston-preto","8707":"/product-page/adidas-boston-lilás","8721":"/product-page/tênis-nb-9060-off-limao","8728":"/product-page/nike-fit-branco-rose","8784":"/product-page/anabela-mônaco-off","8791":"/product-page/anabela-mônaco-preto","8798":"/product-page/anabela-mônaco-caramelo","8805":"/product-page/tamanquinho-bloco-caramelo","8812":"/product-page/tamanquinho-bloco-preto","8819":"/product-page/tamanquinho-bloco-off","8826":"/product-page/tamanquinho-bloco-ouro","8833":"/product-page/rasteira-luxo-off","8840":"/product-page/rasteira-luxo-preto","8847":"/product-page/rasteira-luxo-caramelo","8861":"/product-page/rasteira-bico-folha","8875":"/product-page/tamanquinho-bloco-prata","8882":"/product-page/tênis-nb-9060-branco-prata","8903":"/product-page/nike-fit-cafe","8910":"/product-page/adidas-café","8924":"/product-page/tênis-nike-fit-off-cinza","8931":"/product-page/schuts-cobra-strass-prata","8938":"/product-page/schuts-cobra-strass-dourada","8945":"/product-page/rasteira-prenium-prata-azu","8959":"/product-page/rasteira-prenium-prata","8973":"/product-page/rasteira-serpente-marrom","8980":"/product-page/rasteira-boutique-ouro","8987":"/product-page/tênis-nb-9060-marrom","8994":"/product-page/tênis-nb-9060-off-curcuman","9001":"/product-page/tênis-nb-9060-off-vinho","9015":"/product-page/rasteira-schutz","9022":"/product-page/papete-luxo-schuts-preto","9029":"/product-page/papete-luxo-schuts-caramelo","9036":"/product-page/brizza-arezzo-caramelo","9055":"/product-page/tamanco-schuts-off","9062":"/product-page/tamanco-schuts-preto","9069":"/product-page/tamanco-schuts-prata","9076":"/product-page/tamanco-schuts-caramelo","9083":"/product-page/tênis-adidas-samba-off","9090":"/product-page/papete-aurora-caramelo","9097":"/product-page/papete-aurora-ouro","9104":"/product-page/papete-aurora-off","9111":"/product-page/papete-vitória-off","9118":"/product-page/papete-vitória-ouro","9125":"/product-page/papete-vitória-marsala","9132":"/product-page/rasteira-arezzo-prata","9139":"/product-page/rasteira-arezzo-ouro","9146":"/product-page/cobra-schutz-strass-ii-dourada","9160":"/product-page/tênis-nb-preto","9167":"/product-page/tênis-nb-9060-branco-preto","9174":"/product-page/tênis-nb-9060-branco","9181":"/product-page/schutz-preta","9188":"/product-page/schutz-caramelo","9195":"/product-page/schutz-off","9202":"/product-page/papete-schuts-caramelo","9209":"/product-page/papete-schuts-preta","9216":"/product-page/papete-prada","9223":"/product-page/tamanco-lumen-caramelo","9230":"/product-page/tamanco-lumen-cafe","9237":"/product-page/tamanco-lumen-ouro","9244":"/product-page/tamanco-lumen-branco","9251":"/product-page/tamanco-lumen-preto","9258":"/product-page/bolsa-luxo-caramelo","9268":"/product-page/slingback-telinha-preto","9275":"/product-page/slingback-telinha-café","9282":"/product-page/slingback-telinha-caramelo","9289":"/product-page/rasteira-strass-ouro","9296":"/product-page/flat-schutz-fivela-caramelo","9303":"/product-page/flat-schutz-fivela-preto","9310":"/product-page/flat-schutz-fivela-branco","9317":"/product-page/papete-birken-schutz-preto","9324":"/product-page/papete-birken-schutz-off","9331":"/product-page/papete-birken-schutz-caramelo","9338":"/product-page/rasteira-esferas-prata","9345":"/product-page/rasteira-rafia-preta","9352":"/product-page/rasteira-rafia-caramelo","9367":"/product-page/papete-serpente","9374":"/product-page/tamanco-prata","9381":"/product-page/tamanco-luxo-preto","9388":"/product-page/tamanco-luxo-whisky","9395":"/product-page/tamanco-luxo-ouro","9402":"/product-page/tamanco-tarça-ouro","9409":"/product-page/saltinho-tira-ouro","9416":"/product-page/tênis-nb-rora","9423":"/product-page/tênis-nb-cobre","9430":"/product-page/tênis-adidas-lilás","9437":"/product-page/tênis-nb-9060-r","9444":"/product-page/tênis-nikev-7-café","9451":"/product-page/tênis-nikev-7-off-café","9458":"/product-page/saltinho-tira-preto","9465":"/product-page/tamanco-ouro","9472":"/product-page/tamanco-biqueira-preto","9479":"/product-page/sapatilha-gucci-telinha-marom","9486":"/product-page/sapatilha-gucci-telinha-preto","9493":"/product-page/tamanco-laço-di-valentini-ouro","9500":"/product-page/tamanco-laço-di-valentini-prata","9507":"/product-page/tamanco-laço-di-valentini-preto","9514":"/product-page/tamanco-laço-di-valentini-branco","9521":"/product-page/tamanco-schütz-branco","9528":"/product-page/tamanco-schütz-preto","9535":"/product-page/tamanco-schütz-caramelo","9542":"/product-page/schutz-x-tricô-off","9549":"/product-page/schutz-x-tricô-nude","9556":"/product-page/schutz-x-tricô-preto","9563":"/product-page/tênis-alo"};
 const media=new Map(), names=new Map(), linked=new WeakSet(), badges=new Map(), imageCache=new Map();
 const nameKey=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
  .replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
 for(const item of catalogItems){
  if(!Array.isArray(item)||item.length<4||!item[1]||!item[2])continue;
  media.set(String(item[2]),item);
  const key=nameKey(item[0]);if(!names.has(key))names.set(key,item);
 }
 const state={ready:true,matched:0,controls:0,lastError:null};
 ROOT.__lumenShareV8=state;
 if(!media.size){state.lastError='catalogo_embutido_vazio';return;}
 const style=document.createElement('style');style.textContent=".lumen-v6-ref{position:absolute!important;pointer-events:none!important;display:block!important;z-index:3!important;color:#7e6c5b!important;background:transparent!important;font:500 10px/1.1 Arial,sans-serif!important;white-space:nowrap!important;letter-spacing:.015em!important;padding:0!important;margin:0!important;border:0!important;box-shadow:none!important;transform:none!important}.lumen-v6-notice{position:fixed;bottom:112px;left:14px;right:14px;z-index:2147483200;border-radius:12px;background:#443423;color:#fff;padding:12px;text-align:center;font:12px/1.35 Arial,sans-serif;box-shadow:0 4px 14px #0004;pointer-events:none}.lumen-v6-bulk{position:absolute;top:0;left:0;right:auto;bottom:auto;transform:none;z-index:40;max-width:calc(100vw - 28px);width:max-content;min-height:0;border-radius:13px;background:#fffdf9;color:#79644d;border:1px solid #dfd3c5;box-shadow:none;padding:4px 10px;font:500 10px/1.3 Arial,sans-serif;white-space:nowrap;text-align:center;touch-action:manipulation}.lumen-v6-bulk:disabled{opacity:.76}.lumen-v6-bulk[hidden]{display:none!important}";document.head.appendChild(style);
 const one=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;};
 const photoUrl=(p,edge=2400)=>'https://static.wixstatic.com/media/'+encodeURIComponent(p[2])+'/v1/fit/w_'+edge+',h_'+edge+',q_100/file.jpg';
 const sku=p=>'REF '+String(p[1]||'').slice(0,32);
 const filename=p=>'REF-'+String(p[1]).replace(/[^a-z0-9_-]/gi,'')+'-9x16.jpg';
 const keysOf=s=>{
  const v=String(s||'');
  const out=[];
  const re=/\/media\/([^/?#"' ]+)/g;
  let m;while((m=re.exec(v)))out.push(decodeURIComponent(m[1]));
  return out;
 };
 
  function replacePhoto(p,mediaId){
    if(!mediaId||mediaId===p[2])return;
    if(media.has(mediaId)&&media.get(mediaId)!==p)return;
    const oldId=String(p[2]||'');
    p[2]=String(mediaId);
    media.set(p[2],p);
    imageCache.delete(oldId);
    readyFiles.delete(oldId);
    badFiles.delete(oldId);
    state.liveMediaUpdates=(state.liveMediaUpdates||0)+1;
  }
  function adoptDomPhoto(img,p){
    if(!p)return null;
    const mediaId=keysOf(img.currentSrc||img.src||img.getAttribute('data-src')||'')[0];
    if(mediaId)replacePhoto(p,mediaId);
    return p;
  }
function refreshSizesFromCard(img,p){
  if(!p||!img)return p;
  const card=img.closest('[class*="wixui-repeater__item"]');
  const widget=card?.querySelector('compartilhar-produto');
  const values=String(widget?.getAttribute('tamanhos')||'').match(/(?:3[3-9]|4[0-5])(?:\s*[-/]\s*(?:3[3-9]|4[0-5]))?/g);
  if(values?.length){
   const numbers=[...new Set(values.map(v=>v.replace(/\s+/g,'').replace('/','-')))];
   if(JSON.stringify(p[3])!==JSON.stringify(numbers)){
    p[3]=numbers;
    const id=String(p[2]);
    imageCache.delete(id);
    readyFiles.delete(id);
    badFiles.delete(id);
   }
  }
  return p;
 }
 function getProduct(img){
  for(const s of [img.currentSrc,img.src,img.getAttribute('data-src'),img.getAttribute('srcset'),
   img.getAttribute('data-image-src'),img.alt]){
   for(const k of keysOf(s))if(media.has(k))return refreshSizesFromCard(img,adoptDomPhoto(img,media.get(k)));
  }
  const alt=nameKey(img.alt);
  if(alt&&names.has(alt))return refreshSizesFromCard(img,adoptDomPhoto(img,names.get(alt)));
  const rect=img.getBoundingClientRect();
  if(rect.width<90||rect.height<100)return null;
  let parent=img.parentElement;
  for(let n=0;n<7&&parent;n++,parent=parent.parentElement){
   const t=nameKey(String(parent.innerText||'').slice(0,600));
   if(t.length>15&&t.length<500&&/(varejo|atacado|adicionar ao carrinho)/.test(t)){
    const match=[...names.entries()].find(([name])=>t.includes(name)&&name.length>8);
    if(match)return refreshSizesFromCard(img,adoptDomPhoto(img,match[1]));
   }
  }
  return null;
 }
 function getContainer(img,p){
  let root=img.parentElement,chosen=null;
  const key=nameKey(p[0]);
  for(let i=0;root&&i<8;i++,root=root.parentElement){
   const txt=nameKey(String(root.innerText||'').slice(0,900));
   if(txt.includes(key)&&(txt.includes('varejo')||txt.includes('adicionar ao carrinho'))){
    chosen=root;
    if(txt.length<380)break;
   }
  }
  return chosen;
 }
 function findShare(root,img){
  const ir=img.getBoundingClientRect();
  const middle=(ir.left+ir.right)/2;
  const elements=Array.from((root||img.parentElement||document).querySelectorAll('button,a,svg,[role="button"],[aria-label],[title]')).slice(0,240);
  const tagged=elements.filter(el=>/compartilh|share/i.test([el.getAttribute('aria-label'),el.getAttribute('title'),el.getAttribute('data-testid'),el.textContent?.slice(0,35)].join(' ')));
  const btns=tagged.length?tagged:elements.filter(el=>{
   if(el.tagName.toLowerCase()!=='svg')return false;
   const r=el.getBoundingClientRect();
   return r.width>10&&r.width<40&&r.height>10&&r.height<40&&
    Math.abs((r.left+r.right)/2-middle)<ir.width*.35&&
    r.top>ir.bottom+45&&r.top<ir.bottom+650;
  });
  const filtered=btns.map(el=>el.closest('button,a,[role="button"]')||el)
   .filter(el=>{const r=el.getBoundingClientRect();return r.width>10&&r.height>8&&r.height<80;});
  filtered.sort((a,b)=>Math.abs(a.getBoundingClientRect().left-middle)-Math.abs(b.getBoundingClientRect().left-middle));
  return filtered[0]||null;
 }
 async function loadPhoto(url){
  return new Promise((resolve,reject)=>{
   const img=new Image();img.crossOrigin='anonymous';
   img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('Nao foi possivel baixar a imagem de origem'));
   img.src=url;
  });
 }
 async function renderedPhoto(p){
  let original=null,lastError=null;
  for(const size of [3000,2400,1800,1200]){
   try{original=await loadPhoto(photoUrl(p,size));break;}catch(e){lastError=e;}
  }
  if(!original){
   try{original=await loadPhoto('https://static.wixstatic.com/media/'+encodeURIComponent(p[2]));}
   catch(e){lastError=e;}
  }
  if(!original)throw lastError||new Error('Não foi possível carregar a fotografia');
  const width=1440,height=2560;
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext('2d');
  if(!ctx)throw new Error('O navegador não conseguiu gerar a imagem');
  // Enquadramento COVER: fotografia preenchendo 100% do formato 9:16.
  // Não adicionar fundo branco, moldura, margens nem logotipo.
  const scale=Math.max(width/original.naturalWidth,height/original.naturalHeight);
  const dw=original.naturalWidth*scale,dh=original.naturalHeight*scale;
  ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  ctx.drawImage(original,(width-dw)/2,(height-dh)/2,dw,dh);
  const sizes=Array.isArray(p[3])?[...new Set(p[3].map(String)
   .filter(x=>/^(3[3-9]|4[0-5]|3[3-9]-4[0-5])$/.test(x)))].sort((a,b)=>parseInt(a,10)-parseInt(b,10)).slice(0,13):[];
  // Texto em área segura do Story, levemente mais baixo e sem molduras.
  // Contorno marrom fino preserva a leitura sobre fundo claro.
  ctx.fillStyle='#ffffff';ctx.textAlign='left';ctx.textBaseline='alphabetic';
  ctx.shadowColor='rgba(89,54,31,.42)';ctx.shadowBlur=6;
  ctx.shadowOffsetX=1;ctx.shadowOffsetY=2;
  ctx.strokeStyle='rgba(91,53,31,.80)';ctx.lineWidth=2;
  ctx.lineJoin='round';
  const refText=sku(p);
  ctx.font='600 35px Arial,sans-serif';
  ctx.strokeText(refText,48,2190);ctx.fillText(refText,48,2190);
  if(sizes.length){
   const sizeText='NUMERAÇÕES  '+sizes.join('  •  ');
   ctx.font='500 31px Arial,sans-serif';
   ctx.strokeText(sizeText,48,2247);ctx.fillText(sizeText,48,2247);
  }
  ctx.shadowColor='transparent';ctx.shadowBlur=0;
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.97));
  canvas.width=canvas.height=0;
  if(!blob||blob.size<8000)throw new Error('Não foi possível gerar a foto em alta qualidade');
  return blob;
 }

 const readyFiles=new Map(),filePromises=new Map(),badFiles=new Set();
 const fileQueue=[];let fileWorkers=0;
 let shareInProgress=false,lastShareAt=0,visibleTimer=0;
 function capCache(map,limit){
  while(map.size>limit)map.delete(map.keys().next().value);
 }
 function cachedPhoto(p){
  const key=String(p[2]);
  if(!imageCache.has(key)){
   const task=renderedPhoto(p).catch(e=>{imageCache.delete(key);throw e});
   imageCache.set(key,task);capCache(imageCache,20);
  }
  return imageCache.get(key);
 }
 function pumpPhotos(){
  while(fileWorkers<2&&fileQueue.length){
   const task=fileQueue.shift();fileWorkers++;
   cachedPhoto(task.p).then(blob=>{
    const file=new File([blob],filename(task.p),{type:'image/jpeg'});
    readyFiles.set(task.key,file);capCache(readyFiles,18);
    task.resolve(file);
   }).catch(e=>{badFiles.add(task.key);task.reject(e)})
    .finally(()=>{filePromises.delete(task.key);fileWorkers--;pumpPhotos();});
  }
 }
 
  // Consultar a foto atual nas informacoes estruturadas da propria pagina do produto.
  // Isso tambem funciona para produtos ainda nao renderizados no repetidor do Wix.
  const photoChecked=new Map(),photoChecking=new Map(),photoTtlMs=45000;
  function photoFresh(p){
    return Date.now()-(photoChecked.get(String(p[1]))||0)<photoTtlMs;
  }
  function preparedPhoto(p){
    return photoFresh(p)&&readyFiles.has(String(p[2]));
  }
  async function refreshPhoto(p){
    const ref=String(p[1]||''),path=productPaths[ref];
    if(photoFresh(p)||!path)return;
    if(photoChecking.has(ref))return photoChecking.get(ref);
    const task=(async()=>{
      try{
        const response=await fetch(path,{cache:'no-store',credentials:'same-origin'});
        if(!response.ok)throw new Error('HTTP '+response.status);
        const html=await response.text();
        const regex=/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
        let match,mediaId='';
        while((match=regex.exec(html))){
          let json;
          try{json=JSON.parse(match[1]);}catch(_){continue;}
          const values=Array.isArray(json)?json:[json];
          for(const value of values){
            const entries=Array.isArray(value?.['@graph'])?value['@graph']:[value];
            for(const entry of entries){
              if(!String(entry?.['@type']||'').includes('Product'))continue;
              const main=Array.isArray(entry.image)?entry.image[0]:entry.image;
              const url=typeof main==='string'?main:(main?.contentUrl||main?.url||'');
              mediaId=keysOf(url)[0]||'';
              if(mediaId)break;
            }
            if(mediaId)break;
          }
          if(mediaId)break;
        }
        if(mediaId)replacePhoto(p,mediaId);
        else state.liveMediaError='Pagina sem imagem de produto: '+ref;
      }catch(e){
        // Se a pagina nao puder ser consultada, preservar a ultima foto conhecida.
        state.liveMediaError=String(e?.message||e).slice(0,150);
      }finally{
        photoChecked.set(ref,Date.now());
        photoChecking.delete(ref);
      }
    })();
    photoChecking.set(ref,task);
    return task;
  }
async function warmFile(p){
   await refreshPhoto(p);
  const key=String(p[2]);
  if(readyFiles.has(key))return Promise.resolve(readyFiles.get(key));
  if(filePromises.has(key))return filePromises.get(key);
  if(badFiles.has(key))return Promise.reject(new Error('FOTO_INDISPONIVEL'));
  const task=new Promise((resolve,reject)=>{
   fileQueue.push({key,p,resolve,reject});
  });
  filePromises.set(key,task);
  pumpPhotos();
  return task;
 }
 function notice(msg){
  state.lastError=String(msg||'');
  const old=document.querySelector('.lumen-v6-notice');if(old)old.remove();
  const el=one('div','lumen-v6-notice',String(msg||'').slice(0,220));
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),3300);
 }
 function shareFiles(files,after){
  if(shareInProgress||!files?.length||Date.now()-lastShareAt<800)return false;
  if(typeof navigator.share!=='function'||typeof File==='undefined'){
   notice('Este navegador não oferece compartilhamento nativo de fotos.');
   return false;
  }
  if(navigator.canShare&&!navigator.canShare({files})){
   notice('O aparelho não permite compartilhar essas fotos juntas.');
   return false;
  }
  shareInProgress=true;lastShareAt=Date.now();
  // Invocado diretamente do evento de toque ou clique: preserva ativação
  // de usuário exigida pelo Web Share API no Safari do iPhone.
  try{
   Promise.resolve(navigator.share({files})).then(()=>{
    state.lastShared={count:files.length,names:files.map(x=>x.name),at:Date.now()};
    if(typeof after==='function')after();
   }).catch(error=>{
    if(error?.name!=='AbortError')notice('Não foi possível abrir o compartilhamento. Tente novamente.');
   }).finally(()=>{shareInProgress=false;});
  }catch(e){
   shareInProgress=false;
   if(e?.name!=='AbortError')notice('Não foi possível abrir o compartilhamento. Tente novamente.');
   return false;
  }
  return true;
 }
 function shareSingle(p){
  const file=preparedPhoto(p)?readyFiles.get(String(p[2])):null;
  if(file)return shareFiles([file]);
  warmFile(p).then(()=>notice('Foto preparada! Segure novamente para compartilhar.'))
   .catch(()=>notice('Não consegui preparar esta imagem. Tente novamente.'));
  return false;
 }
 function repeaterItem(img){
  return img.closest('[class*="wixui-repeater__i"]')||
   getContainer(img,getProduct(img))?.parentElement||img.parentElement;
 }
 function addBadge(img,p){
  const existing=badges.get(img);
  if(existing?.ref?.isConnected)return;
  if(existing){existing.ref?.remove();badges.delete(img);}
  const card=repeaterItem(img);
  if(!card)return;
  const ref=one('span','lumen-v6-ref',sku(p));
  ref.dataset.lumenSku=String(p[1]);
  // Inserção no elemento do repeater que é position:relative.
  // A referência nunca altera o fluxo vertical nem invade o SVG.
  if(getComputedStyle(card).position==='static')card.style.position='relative';
  card.appendChild(ref);
  badges.set(img,{ref,p,card});
  state.controls=badges.size;
  placeBadge(img,badges.get(img));
 }
 function placeBadge(img,entry){
  if(!entry?.card?.isConnected||!entry.ref.isConnected)return;
  const card=entry.card,ref=entry.ref;
  const share=card.querySelector('compartilhar-produto');
  const cr=card.getBoundingClientRect();
  const sr=share?.getBoundingClientRect();
  const wa=card.querySelector('[aria-label*="WhatsApp" i]');
  const wr=wa?.getBoundingClientRect();
  const refW=ref.offsetWidth||47,refH=ref.offsetHeight||12;
  let left,top;
  if(sr&&sr.width>5&&sr.height>8){
   left=sr.left-cr.left-refW-10;
   top=sr.top-cr.top+(sr.height-refH)/2;
  }else if(wr){
   left=10;
   top=wr.bottom-cr.top+12;
  }else{
   left=12;
   top=cr.height-refH-11;
  }
  left=Math.max(2,Math.min(cr.width-refW-2,left));
  top=Math.max(0,Math.min(cr.height-refH,top));
  const x=Math.round(left)+'px',y=Math.round(top)+'px';
  if(ref.style.left!==x)ref.style.left=x;
  if(ref.style.top!==y)ref.style.top=y;
 }
 function draw(){
  for(const [img,entry] of badges){
   if(!img.isConnected||!entry.ref.isConnected){entry.ref.remove();badges.delete(img);continue}
   placeBadge(img,entry);
  }
  state.controls=badges.size;
 }
 function eventPhoto(event){
  const target=event.target;
  if(!target||!target.closest)return null;
  const direct=target.closest('img');
  if(direct){const p=getProduct(direct);if(p)return p;}
  const wrapper=target.closest('wix-image,wow-image,[data-testid*="image"],[class*="wixui-image"]');
  const img=wrapper?.querySelector?.('img');
  return img?getProduct(img):null;
 }
 // Safari exige que navigator.share seja chamado com um gesto do usuário.
 // Um toque longo arma a ação; o toqueend abre a folha nativa.
 let holding=null;
 const clearHold=()=>{if(holding?.timer)clearTimeout(holding.timer);holding=null};
 document.addEventListener('touchstart',e=>{
  if(e.touches.length!==1||e.target?.closest?.('button,a,[role="button"]'))return;
  const p=eventPhoto(e);if(!p)return;
  clearHold();
  const t=e.touches[0];
  holding={p,x:t.clientX,y:t.clientY,start:Date.now(),armed:false,timer:0};
  holding.timer=setTimeout(()=>{if(holding)holding.armed=true;},620);
  warmFile(p).catch(()=>{});
 },{capture:true,passive:true});
 document.addEventListener('touchmove',e=>{
  const t=e.touches[0],h=holding;
  if(!t||!h||Math.abs(t.clientX-h.x)>13||Math.abs(t.clientY-h.y)>13)clearHold();
 },{capture:true,passive:true});
 document.addEventListener('touchend',e=>{
  const h=holding;
  if(!h)return;
  const holdTime=Date.now()-h.start;
  const valid=h.armed||holdTime>=620;
  clearHold();
  if(!valid)return;
  // Evita abrir página do produto ou o menu de download do Safari.
  e.preventDefault();
  shareSingle(h.p);
 },{capture:true,passive:false});
 for(const evt of ['touchcancel','scroll'])document.addEventListener(evt,clearHold,{capture:true,passive:true});
 document.addEventListener('contextmenu',e=>{
  const p=eventPhoto(e);
  if(!p)return;
  e.preventDefault();
  clearHold();
  shareSingle(p);
 },{capture:true});
 function bind(img,p){
  if(linked.has(img))return;
  linked.add(img);state.matched++;
  img.style.webkitTouchCallout='none';
  img.style.webkitUserSelect='none';
  img.style.userSelect='none';
  img.addEventListener('dragstart',e=>e.preventDefault());
  img.addEventListener('pointerenter',()=>{if(!('ontouchstart' in window))warmFile(p).catch(()=>{});},{passive:true});
 }
 function warmVisible(){
  let added=0;
  for(const [img,{p}] of badges){
   if(added>=6)break;
   const r=img.getBoundingClientRect();
   if(r.height>80&&r.width>80&&r.top<innerHeight+380&&r.bottom>-100){
    warmFile(p).catch(()=>{});
    added++;
   }
  }
 }
 const BULK_SIZE=10;
 let activeFilter=false,selectedSize='',selectedCategory='',bulkOffset=0,lastSet='',bulkBar=null,bulkButton=null,preparingKey='';
 // O Wix emite click NO LABEL, click NO INPUT e change para um unico toque.
 // O estado do filtro precisa vir da UI atual, nunca de contagem de cliques.
 function normalizeSize(value){
  return String(value||'').trim().replace(/[–/]/g,'-')
   .replace(/^(3[3-9])-(\d)$/,'$1-3$2');
 }
 function mainSizeGroup(){
  const known=document.getElementById('comp-mtlus61b');
  if(known?.querySelector('input[type="checkbox"]'))return known;
  const dropdown=document.querySelector('select.wixui-dropdown__input');
  const top=dropdown?.getBoundingClientRect().top??Infinity;
  return [...document.querySelectorAll('.wixui-selection-tags')]
   .filter(el=>el.querySelector('input[type="checkbox"]')&&
    el.getBoundingClientRect().bottom<=top+10)
   .sort((a,b)=>b.getBoundingClientRect().bottom-a.getBoundingClientRect().bottom)[0]||null;
 }
 function selectedChip(label){
  const input=label.querySelector('input[type="checkbox"]');
  if(input?.checked||label.getAttribute('aria-selected')==='true')return true;
  const m=(getComputedStyle(label).backgroundColor||'').match(/\d+(?:\.\d+)?/g);
  return m?.length>=3&&Number(m[0])+Number(m[1])+Number(m[2])<360;
 }
 function syncFiltersFromUi(){
  const root=mainSizeGroup();
  const select=document.querySelector('select.wixui-dropdown__input');
  const sizes=root?[...root.querySelectorAll('label')]
   .filter(selectedChip).map(l=>normalizeSize(l.querySelector('input')?.value||l.textContent))
   .filter(Boolean):[];
  const size=root?(sizes[0]||''):selectedSize;
  const category=select?String(select.value||''):selectedCategory;
  if(size!==selectedSize||category!==selectedCategory){
   selectedSize=size;selectedCategory=category;
   bulkOffset=0;lastSet='';preparingKey='';filteredCache=null;filteredCacheKey='';
  }
  activeFilter=Boolean(selectedSize||selectedCategory);
 }
 let filteredCacheKey='',filteredCache=null;
 function categoryKey(value){
  const key=nameKey(value);
  if(key.startsWith('chinelo'))return 'chinelo';
  if(key.startsWith('tenis'))return 'tenis';
  if(key.startsWith('bota'))return 'bota';
  if(key.startsWith('bolsa'))return 'bolsas';
  if(key.startsWith('acessorio'))return 'acessorios';
  return key;
 }
 function getFilteredResults(){
  if(!activeFilter)return [];
  const category=categoryKey(selectedCategory);
  const key=category+'|'+selectedSize;
  // Uma busca tem sequência estável: o scroll não altera a lista, nem
  // devolve o compartilhamento ao primeiro lote.
  if(filteredCache&&filteredCacheKey===key)return filteredCache;
  // Catálogo completo do Wix Stores, incluindo itens ainda não renderizados.
  // A última coluna indica estoque; a penúltima, as coleções reais do Wix.
  const all=catalogItems.filter(p=>p[5]===true&&Boolean(p[1]&&p[2])&&
   (!category||(Array.isArray(p[4])&&p[4].includes(category)))&&
   (!selectedSize||(Array.isArray(p[3])&&p[3].some(s=>normalizeSize(s)===selectedSize))));
  const allowed=new Map(all.map(p=>[String(p[2]),p]));
  const seen=new Set(),result=[];
  // Preservar no início a ordem dos produtos que a vitrine já mostrou.
  for(const [img,entry] of badges){
   if(!img.isConnected||!entry.card?.isConnected||!entry.card.getClientRects().length)continue;
   const p=allowed.get(String(entry.p[2]));
   if(!p||seen.has(p[2]))continue;
   seen.add(p[2]);result.push(p);
  }
  // Acrescentar TODOS os produtos restantes, mesmo sem carregar os cards.
  for(const p of all){if(!seen.has(p[2])){seen.add(p[2]);result.push(p);}}
  filteredCacheKey=key;
  filteredCache=result;
  return result;
 }
 function showBulk(){
  if(!bulkButton){
   bulkBar=one('div','');
   bulkButton=one('button','lumen-v6-bulk','Compartilhar fotos');
   bulkButton.type='button';
   bulkButton.setAttribute('aria-label','Compartilhar fotos dos produtos filtrados');
   bulkBar.appendChild(bulkButton);
   document.body.appendChild(bulkBar);
   bulkButton.addEventListener('click',shareBatch);
   bulkBar.style.position='static';
  }
  refreshBulk();
 }
 // O botão fica no fluxo visual ENTRE os filtros e o título,
 // sem se sobrepor aos produtos e sem acompanhar o scroll como elemento fixo.
 function positionBulk(){
  if(!bulkButton||bulkButton.hidden)return;
  const rects=[];
  for(const [img,entry] of badges){
   if(!img.isConnected||!entry.card?.isConnected)continue;
   const r=img.getBoundingClientRect();
   if(r.width>=60&&r.height>=80)rects.push(r.top+scrollY);
  }
  if(!rects.length)return;
  const firstTop=Math.min(...rects);
  const heads=[...document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"],[data-testid="richTextElement"]')];
  const valid=heads.filter(el=>{
   const r=el.getBoundingClientRect(),txt=String(el.innerText||el.textContent||'').trim();
   const bottom=r.bottom+scrollY;
   return r.width>60&&r.height>12&&r.height<100&&txt.length>2&&txt.length<70&&
    bottom<=firstTop-8&&firstTop-bottom<240;
  });
  valid.sort((a,b)=>(b.getBoundingClientRect().bottom-a.getBoundingClientRect().bottom));
  const heading=valid[0];
  if(!heading)return;
  const height=bulkButton.offsetHeight||24;
  // No Wix, o dropdown é a linha 3 e o título a linha 4 do mesmo grid.
  // Em alguns filtros há somente 9px entre eles. Ampliar APENAS essa margem,
  // deslocando título e produtos juntos, para não cobrir nenhum componente.
  const dropdown=document.querySelector('select.wixui-dropdown__input')?.closest('.wixui-dropdown');
  if(dropdown){
   const dr=dropdown.getBoundingClientRect();
   const before=heading.getBoundingClientRect();
   const gap=before.top-dr.bottom;
   const needed=Math.max(33,height+10);
   if(gap<needed&&dropdown.dataset.lumenBulkGap!=='expanded'){
    const current=parseFloat(getComputedStyle(dropdown).marginBottom)||0;
    dropdown.style.marginBottom=Math.ceil(current+needed-gap)+'px';
    dropdown.dataset.lumenBulkGap='expanded';
   }
  }
  const hr=heading.getBoundingClientRect();
  const centerX=hr.left+hr.width/2;
  const left=Math.round(Math.max(6,Math.min(innerWidth-bulkButton.offsetWidth-6,centerX-bulkButton.offsetWidth/2)));
  // A distância visual até o título é pequena: botão fino, margem 5px.
  const top=Math.round(hr.top+scrollY-height-6);
  const xpos=left+'px',ypos=Math.max(0,top)+'px';
  if(bulkButton.style.left!==xpos)bulkButton.style.left=xpos;
  if(bulkButton.style.top!==ypos)bulkButton.style.top=ypos;
 }
 function refreshBulk(){
  if(!bulkButton)return;
  const products=activeFilter?getFilteredResults():[];
  const signature=products.map(p=>String(p[1])).join('|');
  if(signature!==lastSet){
   lastSet=signature;bulkOffset=0;preparingKey='';
  }
  bulkButton.hidden=products.length<2;
  if(products.length<2)return;
  positionBulk();
  if(bulkOffset>=products.length)bulkOffset=0;
  const batch=products.slice(bulkOffset,bulkOffset+BULK_SIZE);
  const allReady=batch.every(preparedPhoto);
  const failures=batch.filter(p=>badFiles.has(String(p[2])));
  const start=bulkOffset+1,end=bulkOffset+batch.length;
  const label=failures.length?
   '↻ Preparar novamente '+failures.length+' foto(s) · '+start+'–'+end+'/'+products.length:
   allReady?'↗ Compartilhar '+batch.length+' fotos · '+start+'–'+end+'/'+products.length:
   'Preparando '+batch.length+' fotos · '+start+'–'+end+'/'+products.length+'...';
  if(bulkButton.textContent!==label)bulkButton.textContent=label;
  positionBulk();
  bulkButton.disabled=!allReady&&!failures.length;
  const key=batch.map(p=>p[2]).join('|');
  if(!allReady&&!failures.length&&preparingKey!==key){
   preparingKey=key;
   Promise.allSettled(batch.map(warmFile)).then(()=>{
    preparingKey='';
    refreshBulk();
   });
  }
 }
 function shareBatch(){
  const products=getFilteredResults();
  const batch=products.slice(bulkOffset,bulkOffset+BULK_SIZE);
  if(!batch.length)return;
     if(batch.some(p=>!preparedPhoto(p))){refreshBulk();return;}
   const failed=batch.filter(p=>badFiles.has(String(p[2])));
  if(failed.length){
   for(const p of failed)badFiles.delete(String(p[2]));
   preparingKey='';refreshBulk();return;
  }
  const files=batch.map(p=>readyFiles.get(String(p[2])));
  if(files.some(x=>!x)){refreshBulk();return;}
  // Alguns aparelhos limitam quantos arquivos podem ser compartilhados.
  // Reduzir o lote sem modificar a foto ou o SKU.
  let selected=files;
  if(navigator.canShare){
   while(selected.length>1&&!navigator.canShare({files:selected})){
    selected=selected.slice(0,Math.ceil(selected.length/2));
   }
  }
  const sent=selected.length;
  shareFiles(selected,()=>{
   bulkOffset+=sent;
   if(bulkOffset>=products.length){
    bulkOffset=0;
    notice('Fotos compartilhadas. Você pode iniciar outro envio.');
   }
   preparingKey='';
   refreshBulk();
  });
 }
 function scheduleBulk(){
  syncFiltersFromUi();
  if(!activeFilter){if(bulkButton)bulkButton.hidden=true;return;}
  if(!bulkBar)showBulk();
  else refreshBulk();
 }
 function markFilter(event){
  const target=event.target;
  if(!target?.matches)return;
  const sizeGroup=mainSizeGroup();
  // Um unico gesto no Wix emite click no label, click no input e change.
  // Somente CHANGE do controle oficial tem autoridade para alterar o filtro.
  if(!target.matches('select.wixui-dropdown__input')&&
   !(target.matches('input[type="checkbox"]')&&sizeGroup?.contains(target)))return;
  setTimeout(()=>{syncFiltersFromUi();scan();scheduleBulk();},180);
 }
 document.addEventListener('change',markFilter,{capture:true,passive:true});
 let scheduled=false;
 function scan(){
  scheduled=false;
  for(const img of document.querySelectorAll('img')){
   const r=img.getBoundingClientRect();
   if(r.width<90||r.height<110)continue;
   const p=getProduct(img);if(!p)continue;
   bind(img,p);
   if(!badges.get(img)?.ref?.isConnected)addBadge(img,p);
  }
  draw();
  if(!visibleTimer){
   visibleTimer=setTimeout(()=>{visibleTimer=0;warmVisible();},250);
  }
  scheduleBulk();
 }
 function schedule(){if(scheduled)return;scheduled=true;setTimeout(scan,240);}
 const observer=new MutationObserver(schedule);
 observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src','srcset','style']});
 let drawQueued=false;
 function scheduleDraw(){
  if(drawQueued)return;drawQueued=true;
  requestAnimationFrame(()=>{drawQueued=false;draw();warmVisible();positionBulk();});
 }
 document.addEventListener('scroll',scheduleDraw,{capture:true,passive:true});
 window.addEventListener('resize',scheduleDraw,{passive:true});
 document.addEventListener('load',schedule,true);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});
 else schedule();
 state.refresh=schedule;
 state.bulkResults=()=>getFilteredResults().length;
})();