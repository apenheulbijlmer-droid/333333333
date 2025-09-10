import React from 'react';
import { useTranslation } from 'react-i18next';
import { UtensilsCrossed, Coffee, ChefHat, Sun, Moon, Wine, Martini } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

type MenuPeriod = 'breakfast' | 'day' | 'evening';

export default function Menu() {
  const { t } = useTranslation();
  const [titleRef, isTitleVisible] = useIntersectionObserver({ threshold: 0 });
  const [menuRef, isMenuVisible] = useIntersectionObserver({ threshold: 0 });
  const [menuPeriod, setMenuPeriod] = React.useState<MenuPeriod>('day');
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const handleMenuToggle = (period: MenuPeriod) => {
    if (period === menuPeriod) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setMenuPeriod(period);
      setIsTransitioning(false);
    }, 300);
  };

  const dayMenu = [
    {
      title: "Ontbijt",
      icon: <Coffee className="text-[var(--gold)]" size={28} />,
      description: "Ontbijt wordt geserveerd tot 15:00h.",
      items: [
        { name: "Marokkaans Ontbijt", price: "€11,50", description: "Twee spiegeleieren met olijven, worst, la vache qui rit; geserveerd met vers brood & een glas jus d'orange." },
        { name: "Spaans Ontbijt", price: "€12,50", description: "Toast met olijven, sla, knoflookolie, oregano, geraspte tomaat & manchego-kaas; geserveerd met een glas jus d'orange." },
        { name: "Shakshuka", price: "€12,50", description: "Gepocheerde eieren in een rijke saus van tomaten, paprika en ui; geserveerd met vers brood & een glas jus d'orange." },
        { name: "Omelet Francesa", price: "€10,50", description: "Fluweelzachte omelet in Franse stijl; geserveerd met vers brood & een glas jus d'orange. Optioneel met zalm of garnalen (+€2,00)." },
        { name: "Yoghurt Bowl", price: "€9,00", description: "Yoghurt met granola, vers fruit, een vleugje vanille & afgetopt met honing." }
      ]
    },
    {
      title: "Diversen",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "French Toast", price: "€11,50", description: "Romige brioche met kaneel, rood fruit & afgetopt met Nutella of Maple Syrup." },
        { name: "American Pancakes", price: "€11,50", description: "Luchtige Amerikaanse pannenkoeken met rood fruit & afgetopt met maple syrup of nutella." },
        { name: "Moroccan Style Pancakes", price: "€13,50", description: "Pannenkoeken met amlou, banaan & crunchy noten." },
        { name: "Msemen", price: "€3,50", description: "Traditioneel Marokkaans platbrood, licht krokant gebakken. Optioneel met kaas of honing (+€1,00)." },
        { name: "Baghrir Amlou", price: "€7,00", description: "Traditionele Marokkaanse pannenkoek met amlou, noten, honing & banaan." }
      ]
    },
    {
      title: "Brioche",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Brioche Manhattan", price: "€12,00", description: "Goudgebakken brioche met krokante kipfilet, kalkoenbacon, cheddarkaas, sla, Japanse mayonaise & ketchup." },
        { name: "Brioche Tuna", price: "€13,00", description: "Brioche met tonijn, gepocheerd ei, sla, hollandaisesaus & parmezaanse kaas." },
        { name: "Brioche Benedict", price: "€14,00", description: "Brioche met kalkoenbacon, gepocheerd ei, avocado, courgette, champignons & hollandaisesaus." }
      ]
    },
    {
      title: "Toast",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Toast Manhattan", price: "€11,50", description: "Toast met krokante kipfilet, avocado, sla, cherrytomaat, huisgemaakte caesardressing & parmezaanse kaas." },
        { name: "Toast Burrata", price: "€11,50", description: "Toast met burrata, avocado, pesto, sla & cherrytomaat." },
        { name: "Toast Tuna Melt", price: "€11,50", description: "Toast met huisgemaakte tonijnsalade, cheddarkaas, pesto, rucola, tomaat & truffelmayonaise." },
        { name: "Toast Avocado-Zalm", price: "€12,50", description: "Toast met gerookte zalm, avocado, roomkaas, rucola & cherrytomaat." }
      ]
    },
    {
      title: "Salades",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Caesar Salade", price: "€11,50", description: "Salade met crispy kipfilet, avocado, croutons, sla, huisgemaakte caesar dressing, cherrytomaat & Parmezaanse kaas." },
        { name: "Salade Carpaccio", price: "€12,50", description: "Salade met carpaccio, rucola, pijnboompitten, rode ui, pesto, truffelmayonaise, cherrytomaat & Parmezaanse kaas." },
        { name: "Salade Burrata", price: "€13,50", description: "Salade met burrata, sla, pesto, appel, walnoot, vijgen, pijnboompitten & honing." }
      ]
    },
    {
      title: "Broodjes",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Broodje Grillworst Luxe", price: "€10,50", description: "Spaans broodje met grillworst, sla, tomaat, komkommer, cheddarkaas & huisgemaakte saus." },
        { name: "Broodje Kip / Hete Kip", price: "€11,00", description: "Spaans broodje met gekruide kipfilet, sla, komkommer, tomaat, cheddarkaas & huisgemaakte saus." },
        { name: "Broodje Kefta", price: "€11,50", description: "Spaans broodje met gekruid gehakt, sla, komkommer, tomaat, cheddarkaas & huisgemaakte saus." },
        { name: "Broodje Carpaccio", price: "€11,50", description: "Spaans broodje met carpaccio, rucola, pesto, truffelmayonaise, pijnboompitten & Parmezaanse kaas." },
        { name: "Broodje Manhattan Pastrami", price: "€12,00", description: "Spaans broodje met pastrami, burrata kaas, rucola, cherrytomaat, pesto & truffelmayonaise." },
        { name: "Philly Cheesesteak Sandwich", price: "€12,50", description: "Spaans broodje met smeuïge rundvlees, cheddarkaas, uitjes & huisgemaakte saus." }
      ]
    },
    {
      title: "Burgers",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      description: "Optioneel geserveerd met friet +€3,00",
      items: [
        { name: "Crispy Chicken Burger", price: "€10,50", description: "Krokante kipburger met cheddarkaas, sla, tomaat, augurk, ui, & Big Mac saus." },
        { name: "Hamburger Grill", price: "€11,00", description: "Royale burger van ambachtelijk rundvlees met sla, tomaat, augurk, ui & Big Mac saus." },
        { name: "Cheese Burger", price: "€11,50", description: "Royale burger van ambachtelijk rundvlees met cheddarkaas, sla, tomaat, augurk, ui & Big Mac saus." },
        { name: "Burger Mexicana", price: "€12,00", description: "Burger met cheddarkaas, jalapeño, sriracha & Big Mac saus." },
        { name: "Smokey Burger", price: "€12,50", description: "Burger met kalkoenbacon, gekarameliseerde ui, sla, tomaat, augurk & BBQ-saus." },
        { name: "Manhattan Burger", price: "€14,50", description: "Dubbele burger met bacon, ei, uienringen, sla, augurk, BBQ saus & Big Mac saus." }
      ]
    },
    {
      title: "Wraps",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Wrap Roerei", price: "€10,50", description: "Wrap gevuld met roerei, sla, tomaat, komkommer, ui, cheddarkaas & huisgemaakte saus." },
        { name: "Wrap Kip / Hete Kip", price: "€11,50", description: "Wrap gevuld met (pikant) gekruide kip, sla, tomaat, komkommer, ui, cheddarkaas & huisgemaakte saus." },
        { name: "Wrap Gehakt", price: "€12,50", description: "Wrap gevuld met gekruid gehakt, sla, tomaat, komkommer, ui, cheddarkaas & huisgemaakte saus." }
      ]
    },
    {
      title: "Sides",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Friet", price: "€4,00", description: "" },
        { name: "Friet Mayo / Ketchup / Curry", price: "€4,50", description: "" },
        { name: "Friet Truffelmayonaise & Parmezaanse Kaas", price: "€7,00", description: "" },
        { name: "Loaded Fries", price: "€7,50", description: "Franse friet met rode chilipeper, bosui, jalapeños, cheddarsaus & huisgemaakte saus. Optioneel met Crispy Chicken Tender of Garnalen (+€2,50)." },
        { name: "Chicken Nuggets", price: "€5,50", description: "" },
        { name: "Bitterballen", price: "€6,50", description: "" },
        { name: "BBQ Hot Wings", price: "€7,50", description: "" },
        { name: "Dynamite Shrimp Chutney", price: "€12,50", description: "" },
        { name: "Kindermenu", price: "€7,50", description: "Een portie kipnuggets en friet voor de kleintjes." }
      ]
    },
    {
      title: "Pasta's",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      description: "Keuze uit Penne, Tagliatelle, Spaghetti, of Ravioli (+€1,00)",
      items: [
        { name: "Pasta Arrabiata", price: "€13,50", description: "Pasta in pittige tomatensaus met cherrytomaat, knoflook, peterselie, Spaanse peper, basilicum & parmezaanse kaas." },
        { name: "Pasta Carbonara", price: "€14,50", description: "Pasta in roomsaus met stukjes kalkoenbacon, ui, basilicum & parmezaanse kaas." },
        { name: "Pasta Manhattan", price: "€15,50", description: "Pasta in roomsaus met kip, champignons, knoflook, ui, basilicum & parmezaanse kaas." },
        { name: "Pasta Alla Pesto", price: "€15,50", description: "Pasta in roomsaus met kipfilet, pesto & parmezaanse kaas." },
        { name: "Pasta Al Salmon", price: "€16,50", description: "Pasta in roomsaus met zalm, courgette, knoflook, ui & parmezaanse kaas." },
        { name: "Pasta Gamberi", price: "€16,50", description: "Pasta in roomsaus met garnalen, paprika, cherrytomaat, knoflook, ui & parmezaanse kaas." }
      ]
    },
    {
      title: "Soepen",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Bissara", price: "€6,50", description: "Traditionele Marokkaanse erwtensoep." },
        { name: "Harira", price: "€6,50", description: "Traditionele Marokkaanse soep met vlees, tomaat, linzen, selderij en kikkererwten." }
      ]
    },
    {
      title: "Wraps",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Wrap Roerei", price: "€10,50", description: "Wrap gevuld met roerei, sla, tomaat, komkommer, ui, cheddarkaas & huisgemaakte saus." },
        { name: "Wrap Kip / Hete Kip", price: "€11,50", description: "Wrap gevuld met (pikant) gekruide kip, sla, tomaat, komkommer, ui, cheddarkaas & huisgemaakte saus." },
        { name: "Wrap Gehakt", price: "€12,50", description: "Wrap gevuld met gekruid gehakt, sla, tomaat, komkommer, ui, cheddarkaas & huisgemaakte saus." }
      ]
    },
    {
      title: "Soepen",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Bissara", price: "€6,50", description: "Traditionele Marokkaanse erwtensoep." },
        { name: "Harira", price: "€6,50", description: "Traditionele Marokkaanse soep met vlees, tomaat, linzen, selderij en kikkererwten." }
      ]
    },
    {
      title: "Warme Dranken",
      icon: <Coffee className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Marokkaanse Muntthee", price: "€3,50", description: "" },
        { name: "Engelse Thee", price: "€3,00", description: "" },
        { name: "Gember Thee", price: "€4,00", description: "" },
        { name: "Gember-Munt Thee", price: "€4,00", description: "" },
        { name: "Koffie Zwart (Americano)", price: "€3,25 / €4,25", description: "Medium / Groot" },
        { name: "Cappuccino", price: "€3,50 / €4,50", description: "Medium / Groot" },
        { name: "Latte Macchiato", price: "€3,75 / €4,75", description: "Medium / Groot" },
        { name: "Caramel Macchiato", price: "€4,00 / €5,00", description: "Medium / Groot" },
        { name: "Koffie Verkeerd (Latte)", price: "€4,00", description: "" },
        { name: "Koffie Manhattan (Nas-Nas)", price: "€4,00", description: "" },
        { name: "Espresso", price: "€3,00", description: "" },
        { name: "Cortado", price: "€3,25", description: "" },
        { name: "Dubbele Espresso", price: "€3,50", description: "" },
        { name: "Flat White", price: "€4,00", description: "" },
        { name: "Hot Chocolate", price: "€4,00", description: "" },
        { name: "Matcha Latte", price: "€5,50", description: "" },
        { name: "Extra Shot Espresso", price: "€1,00", description: "" },
        { name: "Haver/Amandel/Kokos/Soja Melk", price: "€0,50", description: "" },
        { name: "Vanille/Caramel/Hazelnoot Siroop", price: "€0,50", description: "" }
      ]
    },
    {
      title: "Iced",
      icon: <Martini className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "IJskoffie", price: "€5,00", description: "" },
        { name: "Iced Matcha Latte", price: "€5,50", description: "" },
        { name: "Iced Matcha Vanilla", price: "€6,00", description: "" },
        { name: "Iced Matcha Strawberry", price: "€6,50", description: "" },
        { name: "Iced Matcha Mango", price: "€6,50", description: "" },
        { name: "Melkkeuze", price: "+€0,50", description: "Keuze uit volle melk, kokosmelk of havermelk." },
        { name: "Optionele smaken", price: "+€0,50", description: "Caramel, hazelnoot, kersen, citroen, passievrucht." }
      ]
    },
    {
      title: "Mocktails",
      icon: <Martini className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Mojito Classic", price: "€7,50", description: "" },
        { name: "Mojito Strawberry", price: "€7,50", description: "" },
        { name: "Mojito Passion Fruit", price: "€7,50", description: "" },
        { name: "Sunrise Grenadine", price: "€7,50", description: "" },
        { name: "Pina Colada", price: "€7,50", description: "" }
      ]
    },
    {
      title: "Smoothies & Shakes / Jus",
      icon: <Martini className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Jus d'Orange", price: "€5,00", description: "" },
        { name: "Aardbei", price: "€6,50", description: "" },
        { name: "Aardbei Banaan", price: "€6,50", description: "" },
        { name: "Aardbei Mango", price: "€6,50", description: "" },
        { name: "Mango Ananas", price: "€6,50", description: "" },
        { name: "Avocado Power Shake", price: "€7,00", description: "Shake met avocado, banaan en een vleugje vanille." }
      ]
    },
    {
      title: "Koude Dranken",
      icon: <Wine className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Spa Blauw/Rood", price: "€3,00", description: "" },
        { name: "Diverse Frisdranken", price: "€3,00", description: "Cola/Zero, Fanta, Cassis, Sprite, Ginger Ale, Bitter Lemon, Tonic, Poms, Hawai, Oasis Rood/Oranje, Lipton Green/Peach/Sparkling, Fernandes Rood/Groen/Blauw, Chocomel, Fristi, AA, Appelsap" },
        { name: "Schweppes Cream Soda", price: "€3,50", description: "" },
        { name: "RedBull", price: "€4,00", description: "" },
        { name: "Capri Sun", price: "€1,50", description: "" }
      ]
    }
  ];

  const eveningMenu = [
    {
      title: "Voorgerechten - Salades",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Caesar Salade", price: "€11,50", description: "Salade met crispy kipfilet, avocado, croutons, sla, huisgemaakte caesar dressing, cherrytomaat & Parmezaanse kaas." },
        { name: "Salade Carpaccio", price: "€12,50", description: "Salade met carpaccio, rucola, pijnboompitten, rode ui, pesto, truffelmayonaise, cherrytomaat & Parmezaanse kaas." },
        { name: "Salade Burrata", price: "€13,50", description: "Salade met burrata, sla, pesto, appel, walnoot, vijgen, pijnboompitten & honing." }
      ]
    },
    {
      title: "Voorgerechten - Soepen",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Bissara", price: "€6,50", description: "Traditionele Marokkaanse erwtensoep." },
        { name: "Harira", price: "€6,50", description: "Traditionele Marokkaanse soep met vlees, tomaat, linzen, selderij en kikkererwten." }
      ]
    },
    {
      title: "Voorgerechten - Lekkernijen",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Friet", price: "€4,00", description: "" },
        { name: "Friet Mayo / Ketchup / Curry", price: "€4,50", description: "" },
        { name: "Friet Truffelmayonaise & Parmezaanse Kaas", price: "€7,00", description: "" },
        { name: "Loaded Fries", price: "€7,50", description: "Franse friet met rode chilipeper, bosui, jalapeños, cheddarsaus & huisgemaakte saus. Optioneel met Crispy Chicken Tender of Garnalen (+€2,50)." },
        { name: "Chicken Nuggets", price: "€5,50", description: "" },
        { name: "Bitterballen", price: "€6,50", description: "" },
        { name: "BBQ Hot Wings", price: "€7,50", description: "" },
        { name: "Dynamite Shrimp Chutney", price: "€12,50", description: "" }
      ]
    },
    {
      title: "Hoofdgerechten - Specialiteiten",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Lamsrack", price: "€27,50", description: "Lamsrack van de grill met romige champignonsaus, rijst, friet & groenten." },
        { name: "Spareribs", price: "€28,50", description: "Langzaam gegaarde spareribs met barbecuesmaak; geserveerd met rijst, friet & groenten." },
        { name: "Steak Ribeye", price: "€29,50", description: "Biefstuk uit de rib van een rund; geserveerd met champignonsaus, rijst, friet & groenten." },
        { name: "Filet Mignon", price: "€32,50", description: "Malse ossenhaas; geserveerd met champignonsaus, rijst, friet & groenten." },
        { name: "Manhattan Mixed Grill", price: "€35,00", description: "Mix van kipfilet, kefta, gegrilde worstjes, lamsrack & ribeye; geserveerd met champignonsaus, rijst, friet & groenten." },
        { name: "Manhattan Mixed Grill 2 Personen", price: "€65,00", description: "Mix van kipfilet, kefta, worstjes, lamsrack & ribeye; geserveerd met champignonsaus, rijst, friet & groenten." }
      ]
    },
    {
      title: "Hoofdgerechten - Fajita's",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Fajita Kip", price: "€20,50", description: "Tortilla's met gegrilde kip, groente, rijst, friet & verse guacamole." },
        { name: "Fajita Vlees", price: "€21,50", description: "Tortilla's met gemarineerd rundvlees, groente, rijst, friet & verse guacamole." },
        { name: "Fajita Garnalen", price: "€22,50", description: "Tortilla's met garnalen, groente, rijst, friet & verse guacamole." }
      ]
    },
    {
      title: "Hoofdgerechten - Schotels",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Hete Kip Schotel", price: "€17,50", description: "Pikant gekruide kipfilet met rijst, salade & friet." },
        { name: "Kipsaté Schotel", price: "€18,50", description: "Kipspiesjes met satésaus, geserveerd met rijst, salade & friet." },
        { name: "Manhattan Schotel", price: "€19,50", description: "Kip met champignons in roomsaus; geserveerd met rijst, salade & friet." },
        { name: "Kefta Schotel", price: "€19,50", description: "Rundergehakt met rijst, salade & friet." },
        { name: "Zalm Schotel", price: "€20,50", description: "Zalmfilet met rijst, salade & friet." }
      ]
    },
    {
      title: "Hoofdgerechten - Pasta's",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      description: "Keuze uit Penne, Tagliatelle, Spaghetti, of Ravioli (+€1).",
      items: [
        { name: "Pasta Arrabiata", price: "€13,50", description: "Pasta in pittige tomatensaus met tomaat, knoflook, peterselie, Spaanse peper, basilicum & parmezaan." },
        { name: "Pasta Carbonara", price: "€14,50", description: "Pasta in roomsaus met kalkoenbacon, ui, basilicum & parmezaan." },
        { name: "Pasta Manhattan", price: "€15,50", description: "Pasta in roomsaus met kip, champignons, knoflook, ui, basilicum & parmezaan." },
        { name: "Pasta Alla Pesto", price: "€15,50", description: "Pasta in roomsaus met kipfilet, pesto & parmezaan." },
        { name: "Pasta Al Salmon", price: "€16,50", description: "Pasta in roomsaus met zalm, courgette, knoflook, ui & parmezaan." },
        { name: "Pasta Gamberi", price: "€16,50", description: "Pasta in roomsaus met garnalen, paprika, tomaat, knoflook, ui & parmezaan." }
      ]
    },
    {
      title: "Burgers",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      description: "Optioneel geserveerd met friet + €3,00.",
      items: [
        { name: "Crispy Chicken Burger", price: "€10,50", description: "Krokante kipburger met cheddarkaas, sla, tomaat, augurk, ui & Big Mac saus." },
        { name: "Hamburger Grill", price: "€11,00", description: "Rundvleesburger met sla, tomaat, augurk, ui & Big Mac saus." },
        { name: "Cheese Burger", price: "€11,50", description: "Rundvleesburger met cheddarkaas, sla, tomaat, augurk, ui & Big Mac saus." },
        { name: "Burger Mexicana", price: "€12,00", description: "Rundvleesburger met cheddarkaas, jalapeño, sriracha, sla, tomaat, ui & Big Mac saus." },
        { name: "Smokey Burger", price: "€12,50", description: "Rundvleesburger met kalkoenbacon, gekarameliseerde ui, sla, tomaat, augurk & BBQ-saus." },
        { name: "Manhattan Burger", price: "€14,50", description: "Dubbele rundvleesburger met bacon, ei, uienringen, sla, augurk, BBQ saus & Big Mac saus." }
      ]
    },
    {
      title: "Kindermenu",
      icon: <UtensilsCrossed className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Kindermenu", price: "€7,50", description: "Portie kipnuggets en friet voor kinderen." }
      ]
    },
    {
      title: "Warme Dranken",
      icon: <Coffee className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Marokkaanse Muntthee", price: "€3,50", description: "" },
        { name: "Engelse Thee", price: "€3,00", description: "" },
        { name: "Gember Thee", price: "€4,00", description: "" },
        { name: "Gember-Munt Thee", price: "€4,00", description: "" },
        { name: "Koffie Zwart (Americano)", price: "€3,25 / €4,25", description: "Medium / Groot" },
        { name: "Cappuccino", price: "€3,50 / €4,50", description: "Medium / Groot" },
        { name: "Latte Macchiato", price: "€3,75 / €4,75", description: "Medium / Groot" },
        { name: "Caramel Macchiato", price: "€4,00 / €5,00", description: "Medium / Groot" },
        { name: "Koffie Verkeerd (Latte)", price: "€4,00", description: "" },
        { name: "Koffie Manhattan (Nas-Nas)", price: "€4,00", description: "" },
        { name: "Espresso", price: "€3,00", description: "" },
        { name: "Cortado", price: "€3,25", description: "" },
        { name: "Dubbele Espresso", price: "€3,50", description: "" },
        { name: "Flat White", price: "€4,00", description: "" },
        { name: "Hot Chocolate", price: "€4,00", description: "" },
        { name: "Matcha Latte", price: "€5,50", description: "" },
        { name: "Extra Shot Espresso", price: "€1,00", description: "" },
        { name: "Haver/Amandel/Kokos/Soja Melk", price: "€0,50", description: "" },
        { name: "Vanille/Caramel/Hazelnoot Siroop", price: "€0,50", description: "" }
      ]
    },
    {
      title: "Iced",
      icon: <Martini className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "IJskoffie", price: "€5,00", description: "" },
        { name: "Iced Matcha Latte", price: "€5,50", description: "" },
        { name: "Iced Matcha Vanilla", price: "€6,00", description: "" },
        { name: "Iced Matcha Strawberry", price: "€6,50", description: "" },
        { name: "Iced Matcha Mango", price: "€6,50", description: "" },
        { name: "Iced Matcha Cherry", price: "€6,50", description: "" }
      ]
    },
    {
      title: "Mocktails",
      icon: <Martini className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Mojito Classic", price: "€7,50", description: "" },
        { name: "Mojito Strawberry", price: "€7,50", description: "" },
        { name: "Mojito Passion Fruit", price: "€7,50", description: "" },
        { name: "Sunrise Grenadine", price: "€7,50", description: "" },
        { name: "Pina Colada", price: "€7,50", description: "" }
      ]
    },
    {
      title: "Smoothies & Shakes",
      icon: <Martini className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Jus d'Orange", price: "€5,00", description: "" },
        { name: "Aardbei", price: "€6,50", description: "" },
        { name: "Aardbei Banaan", price: "€6,50", description: "" },
        { name: "Aardbei Mango", price: "€6,50", description: "" },
        { name: "Mango Ananas", price: "€6,50", description: "" },
        { name: "Avocado Power Shake", price: "€7,00", description: "Shake met avocado, banaan en vanille." }
      ]
    },
    {
      title: "Koude Dranken",
      icon: <Wine className="text-[var(--gold)]" size={28} />,
      items: [
        { name: "Spa Blauw/Rood", price: "€3,00", description: "" },
        { name: "Diverse Frisdranken", price: "€3,00", description: "Cola/Zero, Fanta, Cassis, Sprite, Ginger Ale, Bitter Lemon, Tonic, Poms, Hawai, Oasis Rood/Oranje, Lipton Green/Peach/Sparkling, Fernandes Rood/Groen/Blauw/Geel, Chocomel, Fristi, AA" },
        { name: "Schweppes Cream Soda", price: "€3,50", description: "" },
        { name: "Appelsap", price: "€3,50", description: "" },
        { name: "RedBull", price: "€4,00", description: "" },
        { name: "Capri Sun", price: "€1,50", description: "" }
      ]
    }
  ];

  const menuSections = menuPeriod === 'day' ? dayMenu : eveningMenu;

  return (
    <div className="pt-24 min-h-screen relative menu-page">
      {/* Textured background */}
      <div className="fixed inset-0 z-0 will-change-transform"
           style={{
             backgroundImage: `
               radial-gradient(circle at 20% 20%, rgba(253, 245, 230, 0.03) 0%, transparent 50%),
               radial-gradient(circle at 80% 80%, rgba(253, 245, 230, 0.03) 0%, transparent 50%),
               url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 25H25L30 5Z M30 55L25 35H35L30 55Z' fill='%23B5995C' fill-opacity='0.12'/%3E%3C/svg%3E"),
               linear-gradient(135deg, rgba(18, 18, 18, 1) 0%, rgba(0, 0, 0, 1) 100%)
             `,
             backgroundSize: 'cover, cover, 60px 60px, cover',
             backgroundPosition: 'center',
             backgroundBlendMode: 'soft-light',
             transform: 'translateZ(0)',
             backfaceVisibility: 'hidden'
           }}>
      </div>
      {/* Gradient overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
      </div>
      {/* Content */}
      <div className="relative z-10">
      <div className="container mx-auto px-4 py-12 backdrop-blur-[3px]">
        <h1 
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className={`font-serif text-4xl md:text-6xl text-[var(--gold)] text-center mb-8 reveal ${
            isTitleVisible ? 'visible' : ''
          }`}
        >
          Menu
        </h1>
        <p className="text-white/90 text-xl md:text-2xl text-center mb-8 font-light max-w-3xl mx-auto">
          Heb jij een voedselintolerantie of last van allergenen? Meld dit aan ons personeel!
        </p>

        <div className="flex justify-center mb-16 px-4">
          <div className="inline-flex gap-6 justify-center">
            <button
              onClick={() => handleMenuToggle('day')}
              className={`px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 h-[48px]
                         border backdrop-blur-sm min-w-[140px] sm:min-w-[160px] justify-center hover:scale-105 ${
                menuPeriod === 'day'
                  ? 'bg-[var(--gold)] text-black border-[var(--gold)] shadow-lg hover:bg-[var(--gold-hover)]'
                  : 'text-white border-[var(--gold)]/30 hover:border-[var(--gold)] hover:bg-[var(--dark-bg)]'
              }`}
              aria-pressed={menuPeriod === 'day'}
            >
              <Sun size={20} />
              <span className="font-medium">Ontbijt & Lunch</span>
            </button>
            <button
              onClick={() => handleMenuToggle('evening')}
              className={`px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 h-[48px]
                         border backdrop-blur-sm min-w-[140px] sm:min-w-[160px] justify-center hover:scale-105 ${
                menuPeriod === 'evening'
                  ? 'bg-[var(--gold)] text-black border-[var(--gold)] shadow-lg hover:bg-[var(--gold-hover)]'
                  : 'text-white border-[var(--gold)]/30 hover:border-[var(--gold)] hover:bg-[var(--dark-bg)]'
              }`}
              aria-pressed={menuPeriod === 'evening'}
            >
              <Moon size={20} />
              <span className="font-medium">Diner</span>
            </button>
          </div>
        </div>
        <div className={`text-center transition-all duration-300 mb-8 ${
          menuPeriod === 'evening' 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform -translate-y-4 pointer-events-none absolute'
        }`}>
          <span className="text-white text-lg font-medium tracking-wider">
            vanaf 17:30
          </span>
        </div>

        <div 
          ref={menuRef as React.RefObject<HTMLDivElement>}
          className={`max-w-6xl mx-auto space-y-24 stagger-children transition-opacity duration-300 ${
            isMenuVisible && !isTransitioning ? 'visible opacity-100' : 'opacity-0'
          }`}
        >
          {menuSections.map((section, index) => (
            <div key={index} className="menu-section relative">
              <div className="flex items-center gap-4 mb-12">
                {section.icon}
                <h2 className="font-serif text-4xl text-white font-bold">{section.title}</h2>
              </div>
              {section.description && (
                <p className="text-white/80 text-sm leading-relaxed italic mb-6">
                  {section.description}
                </p>
              )}
              <div className="grid md:grid-cols-2 gap-8">
                {section.items.slice(0, Math.ceil(section.items.length / 2)).map((item, itemIndex) => (
                  <div key={itemIndex} className="menu-card group mx-auto">
                    <div>
                      <h3 className="group-hover:text-[var(--gold)] transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p>{item.description}</p>
                    </div>
                    <p className="price whitespace-nowrap">{item.price}</p>
                  </div>
                ))}
                {section.items.slice(Math.ceil(section.items.length / 2)).map((item, itemIndex) => (
                  <div key={itemIndex} className="menu-card group mx-auto">
                    <div>
                      <h3 className="group-hover:text-[var(--gold)] transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p>{item.description}</p>
                    </div>
                    <p className="price whitespace-nowrap">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}