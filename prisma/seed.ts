/* eslint-disable no-await-in-loop */
import { PrismaClient, Role, Condition, EateryType, EaterySubtype, VendingType } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Users
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  }

  // Stuff
  for (const data of config.defaultData) {
    const condition = (data.condition as Condition) || Condition.good;
    console.log(`  Adding stuff: ${JSON.stringify(data)}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.stuff.upsert({
      where: { id: config.defaultData.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  }

  // Eateries
  for (const eatery of config.defaultEateries) {
    console.log(`  Adding eatery: ${eatery.name}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.eatery.upsert({
      where: { name: eatery.name },
      update: {},
      create: {
        keywords: eatery.keywords,
        type: eatery.type as EateryType,
        subtype: eatery.subtype as EaterySubtype,
        name: eatery.name,
        location: eatery.location,
        room: eatery.room,
        floor: eatery.floor,
        hours: eatery.hours,
        phone: eatery.phone,
        email: eatery.email,
        website: eatery.website,
        notes: eatery.notes,
        x: eatery.x,
        y: eatery.y,
      },
    });
  }

  // Vending Machines
  for (const machine of config.defaultVendingMachines) {
    const type = (machine.type as VendingType) || VendingType.SNACK;
    console.log(`  Adding vending machine: ${machine.location} (${machine.type})`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.vendingMachine.upsert({
      where: { id: config.defaultVendingMachines.indexOf(machine) + 1 },
      update: {},
      create: {
        type,
        location: machine.location,
        hours: machine.hours,
        floor: machine.floor,
        x: machine.x,
        y: machine.y,
      },
    });
  }

  // Seed Allergies
  const allergies = [
    'Peanuts',
    'Tree Nuts',
    'Milk',
    'Fish',
    'Shellfish',
    'Wheat',
    'Gluten',
    'Sesame',
    'Mustard',
  ];

  for (const name of allergies) {
    console.log(`  Creating allergy: ${name}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.allergy.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Grindz Moods
  const moods = [
    {
      name: 'Vegetarian Vibes',
      items: [
        {
          name: 'Egg, Pesto, and Mozzarella Sandwich',
          image: 'https://globalassets.starbucks.com/digitalassets/products/food/'
          + 'EggPestoMozzarellaSandwich.jpg?impolicy=1by1_medium_630',
          alt: 'Egg, Pesto, and Mozzarella Sandwich from Starbucks',
          source: 'Starbucks - Egg, Pesto, and Mozzarella Sandwich',
          nutrition: 'Calories: 390 | Protein: 21g | Fat: 16g | Carbs: 36g',
        },
        {
          name: 'Greens n Ginger Smoothie',
          image: 'https://tb-static.uber.com/prod/image-proc/processed_images/'
          + '20104fcef39781fc0cc069d42675e8f2/0fb376d1da56c05644450062d25c5c84.jpeg',
          alt: 'Greens n Ginger smoothie from Jamba Juice',
          source: 'Jamba Juice - Greens n Ginger',
          nutrition: 'Calories: 290 | Protein: 4g | Fat: 1g | Carbs: 70g',
        },
        {
          name: 'Veggie Delight',
          image: 'https://subwayisfresh.com.sg/wp-content/uploads/2022/01/Menuitem-Veggie-Delite.jpg',
          alt: 'Veggie Delight from Subway',
          source: 'Subway - Veggie Delight',
          nutrition: 'Calories: 250 | Protein: 10g | Fat: 6g | Carbs: 39g',
        },
        {
          name: 'Veggie Spring Rolls',
          image: 'https://i.redd.it/z8hy5fs8qx451.jpg',
          alt: 'Veggie Spring Rolls from Panda Express',
          source: 'Panda Express - Veggie Spring Rolls',
          nutrition: 'Calories: 296 | Protein: 7g | Fat: 12g | Carbs: 38g',
        },
        {
          name: 'Kunia Bowl',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZnzMmF5AVMysYBphv0WOmgwcxnSEXoROm8A&s',
          alt: 'Kunia Bowl from Bowlful',
          source: 'Bowlful - Kunia Bowl',
          nutrition: 'Calories: 834 | Protein: 35g | Fat: 40g | Carbs: 95g',
        },
        {
          name: 'Bean & Rice Burrito',
          image: 'https://www.thespruceeats.com/thmb/pMd2Q-GDT4wBJEGLhorxHwnQLgQ=/750x0/filters:no_upscale():max_bytes'
          + '(150000):strip_icc():format(webp)/vegetarian-bean-and-rice-burrito-recipe-3378550-hero-01-40e'
          + 'cbc08fcc84e80b8be853c1b779a13.jpg',
          alt: 'Bean & Rice Burrito from Brito Bowl',
          source: 'Brito - Bean & Rice Burrito',
          nutrition: 'Calories: 470 | Protein: 23g | Fat: 14g | Carbs: 70g',
        },
        {
          name: 'Tofu Salad',
          image: 'https://i0.wp.com/www.supperwithmichelle.com/wp-content/uploads/2020/08/IMG_2634.jpg?w=1125&ssl=1',
          alt: 'Tofu Salad from Bale',
          source: 'Bale - Tofu Salad',
          nutrition: 'Calories: 305 | Protein: 18g | Fat: 26g | Carbs: 4.7g',
        },
        {
          name: 'Tofu Pho',
          image: 'https://thatvegannephew.com/wp-content/uploads/2020/09/IMG_4458-scaled.jpeg',
          alt: 'Tofu Pho from Bale',
          source: 'Bale - Tofu Pho',
          nutrition: 'Calories: 380 | Protein: 20g | Fat: 12g | Carbs: 43g',
        },
      ],
    },
    {
      name: 'Quick Bento Run',
      items: [
        {
          name: 'Furikake Fish Plate',
          image: 'https://s3-media0.fl.yelpcdn.com/bphoto/1IqjvZEaXYotY1C3LLlAbA/o.jpg',
          alt: 'Furikake Fish Plate from Campus Center Food Court',
          source: 'Campus Center Food Court - Furikake Fish Plate',
          nutrition: 'Calories: 750 | Protein: 30g | Fat: 26g | Carbs: 95g',
        },
        {
          name: 'Musubis',
          image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2022/11/holoholo_big.jpg',
          alt: 'Musubis from HoloHolo Bistro',
          source: 'Holoholo Bistro - Musubis',
          nutrition: 'Calories: 280 | Protein: 7g | Fat: 0.5g | Carbs: 58g',
        },
        {
          name: 'Mini Chicken Katsu Plate',
          image: 'https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,'
          + 'format=auto,quality=90/media/photosV2/d179748a-7b0a-4101-b0f1-f08f8eae53bf-retina-large.jpg',
          alt: 'Mini Chicken Katsu Plate from L&L',
          source: 'L&L - Mini Chicken Katsu Plate',
          nutrition: 'Calories: 970 | Protein: 37g | Fat: 50g | Carbs: 97g',
        },
        {
          name: 'Garlic Chicken Bento',
          image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2022/11/holob_big2.jpg',
          alt: 'Garlic Chicken Bento from HoloHolo Bistro',
          source: 'Holoholo Bistro - Garlic Chicken Bento',
          nutrition: 'Calories: 900 | Protein: 36g | Fat: 35g | Carbs: 95g',
        },
        {
          name: 'BBQ Mix Plate',
          image: 'https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,'
          + 'quality=90/media/photos/3c4531e7-48a9-4a8f-9269-b35c82d0c169-retina-large-jpeg',
          alt: 'BBQ Mix Plate from L&L',
          source: 'L&L - BBQ Mix Plate',
          nutrition: 'Calories: 1274 | Protein: 70g | Fat: 61g | Carbs: 106g',
        },
        {
          name: 'Loco Moco Plate',
          image: 'https://images.prismic.io/hawaiianbarbecue/8540b0dc-0f63-408c-'
          + 'bfba-eeb26399c374_Loco_Moco-optimized.png?auto=compress%2Cformat&fit=max&w=500&h=388&fm=webp',
          alt: 'Loco Moco Plate from L&L',
          source: 'L&L - Loco Moco Plate',
          nutrition: 'Calories: 1369 | Protein: 55g | Fat: 80g | Carbs: 102g',
        },
        {
          name: 'Kimchi Fried Rice',
          image: 'https://fullofplants.com/wp-content/uploads/2023/08/vegan-'
          + 'kimchi-fried-rice-spicy-korean-inspired-dish-thumb.jpg',
          alt: 'Kimchi Fried Rice from Campus Center Food Court',
          source: 'Campus Center Food Court - Kimchi Fried Rice',
          nutrition: 'Calories: 300 | Protein: 13g | Fat: 12g | Carbs: 40g',
        },
        {
          name: 'Egg Fried Rice',
          image: 'https://www.carolinescooking.com/wp-content/uploads/2016/01/vegetable-egg-fried-rice-photo-1.jpg',
          alt: 'Egg Fried Rice from Campus Center Food Court',
          source: 'Campus Center Food Court - Egg Fried Rice',
          nutrition: 'Calories: 350 | Protein: 11g | Fat: 12g | Carbs: 45g',
        },
      ],
    },
    {
      name: 'Grindz for Gains',
      items: [
        {
          name: 'Grilled Teriyaki Chicken',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTStEIUPt5aA-72zVIXhanUlwNbmSgW6_qbkA&s',
          alt: 'Grilled Teriyaki Chicken from Panda Express',
          source: 'Panda Express - Grilled Teriyaki Chicken',
          nutrition: 'Calories: 275 | Protein: 33g | Fat: 10g | Carbs: 14g',
        },
        {
          name: 'Grilled Chicken Wrap',
          image: 'https://www.sabwaymenu.com/wp-content/uploads/2024/10/grilled-chicken-460-cals-670ca5953854e.webp',
          alt: 'Grilled Chicken Wrap from Subway',
          source: 'Subway - Grilled Chicken Wrap',
          nutrition: 'Calories: 470 | Protein: 42g | Fat: 11g | Carbs: 54g',
        },
        {
          name: 'BBQ Chicken Plate',
          image: 'https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,'
          + 'format=auto,quality=90/media/photos/d8be0933-1adb-4b0a-a402-fd9b9b14da61-retina-large-jpeg',
          alt: 'BBQ Chicken Plate from L&L',
          source: 'L&L - BBQ Chicken Plate',
          nutrition: 'Calories: 1175 | Protein: 66g | Fat: 55g | Carbs: 100g',
        },
        {
          name: "B'rito Bowl",
          image: 'https://images-prd.sodexomyway.net/web/en-us/media/BRITO%20BOWLS%20SMW%20HEADER_tcm17-32511.jpg',
          alt: "Bowl from B'rito",
          source: "B'rito - Bowl",
          nutrition: 'Calories: 770 | Protein: 35g | Fat: 28g | Carbs: 62g',
        },
        {
          name: 'BBQ Mix Plate',
          image: 'https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,'
          + 'quality=90/media/photos/3c4531e7-48a9-4a8f-9269-b35c82d0c169-retina-large-jpeg',
          alt: 'BBQ Mix Plate from L&L',
          source: 'L&L - BBQ Mix Plate',
          nutrition: 'Calories: 1274 | Protein: 70g | Fat: 61g | Carbs: 106g',
        },
        {
          name: 'Warrior Cheeseburger',
          image: 'https://scontent.fhnl2-1.fna.fbcdn.net/v/t39.30808-6/470678759_8788617'
          + '477882696_1974636870662072541_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=108&c'
          + 'cb=1-7&_nc_sid=3a1ebe&_nc_ohc=bRkK_iIHfTYQ7kNvwF-VDfb&_nc_oc=AdnoRnCy9eWIMBZ3'
          + 'o0fivmHjTUGb-BUKsjElhWYtxmFeFcyjuNP4ENBAJA2naBof-aE&_nc_zt=23&_nc_ht=scontent.fhnl2'
          + '-1.fna&_nc_gid=JvTkc3_FK32ZkJei3Zkb4g&oh=00_AfHhR-lUB-qJFOSUHlPAgZ4eP-azKl7O0wcFgEmr-riIew&oe=681C6660',
          alt: 'Warrior Cheeseburger from Campus Center Food Court',
          source: 'Campus Center Food Court - Warrior Cheeseburger',
          nutrition: 'Calories: 803 | Protein: 45g | Fat: 42g | Carbs: 60g',
        },
        {
          name: 'Beef Pho',
          image: 'https://img.livestrong.com/-/clsd/getty/9f22025736d840baa3b87bcb0726ac77.jpg',
          alt: 'Beef Pho from Bale',
          source: 'Bale - Beef Pho',
          nutrition: 'Calories: 640 | Protein: 47g | Fat: 15g | Carbs: 80g',
        },
        {
          name: 'Yakitori Chicken Skewers',
          image: 'https://therecipecritic.com/wp-content/uploads/2022/06/yakitorichicken.jpg',
          alt: 'Yakitori Chicken Skewers from Bowlful',
          source: 'Bowlful - Yakitori Chicken Skewers',
          nutrition: 'Calories: 145 | Protein: 30g | Fat: 4g | Carbs: 5g',
        },
      ],
    },
    {
      name: 'Satisfying Sips',
      items: [
        {
          name: 'Orange Dream Machine',
          image: 'https://tb-static.uber.com/prod/image-proc/processed_images/26442f12f17030'
          + '126de3721d6fb13253/0fb376d1da56c05644450062d25c5c84.jpeg',
          alt: 'Orange Dream Machine from Jamba Juice',
          source: 'Jamba Juice - Orange Dream Machine',
          nutrition: 'Calories: 400 | Protein: 6g | Fat: 0g | Carbs: 93g',
        },
        {
          name: 'Aloha Pineapple',
          image: 'https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,qual'
          + 'ity=90/media/photosV2/3fea9618-001e-4a05-8725-85bab234bb95-retina-large.png',
          alt: 'Aloha Pineapple from Jamba Juice',
          source: 'Jamba Juice - Aloha Pineapple',
          nutrition: 'Calories: 390 | Protein: 7g | Fat: 0g | Carbs: 92g',
        },
        {
          name: 'Caramel Frappuccino',
          image: 'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20220323'
          + '_CaramelFrapp.jpg?impolicy=1by1_wide_topcrop_630',
          alt: 'Caramel Frappuccino from Starbucks',
          source: 'Starbucks - Caramel Frappuccino',
          nutrition: 'Calories: 380 | Protein: 4g | Fat: 15g | Carbs: 67g',
        },
        {
          name: 'Hot Chai Latte',
          image: 'https://www.starbucks.co.uk/_next/image?url=https%3A%2F%2Fwww.digitalassets'
          + '.starbucks.eu%2Fsites%2Fstarbucks-medialibrary%2Ffiles%2FChai-Latte.jpeg&w=3840&q=75',
          alt: 'Hot Chai Latte from Starbucks',
          source: 'Starbucks - Hot Chai Latte',
          nutrition: 'Calories: 240 | Protein: 8g | Fat: 4.5g | Carbs: 45g',
        },
        {
          name: 'Iced Matcha Tea Latte',
          image: 'https://globalassets.starbucks.com/digitalassets/products/bev/IcedMatchaTeaLat'
          + 'te.jpg?impolicy=1by1_wide_topcrop_630',
          alt: 'Iced Matcha Tea Latte from Starbucks',
          source: 'Starbucks - Iced Matcha Tea Latte',
          nutrition: 'Calories: 190 | Protein: 9g | Fat: 5g | Carbs: 27g',
        },
        {
          name: 'Taro Milk Tea',
          image: 'https://www.dingtea.com/Templates/pic/m/taro-milk-tea.jpg',
          alt: 'Taro Milk Tea from Ding Tea',
          source: 'Ding Tea - Taro Milk Tea',
          nutrition: 'Calories: 514 | Protein: 2g | Fat: 11g | Carbs: 94g',
        },
        {
          name: 'Black Tea Latte',
          image: 'https://www.dingtea.com/Templates/pic/m/black-tea-latte.jpg',
          alt: 'Black Tea Latte from Ding Tea',
          source: 'Ding Tea - Black Tea Latte',
          nutrition: 'Calories: 314 | Protein: 6g | Fat: 4g | Carbs: 48g',
        },
        {
          name: 'Lavender Lemonade',
          image: 'https://alekasgettogether.com/wp-content/uploads/2022/04/lavender-cocktail-1-10.jpg',
          alt: 'Lavender Lemonade from Holoholo Bistro',
          source: 'Holoholo Bistro - Lavender Lemonade',
          nutrition: 'Calories: 241 | Protein: 0g | Fat: 0g | Carbs: 60g',
        },
      ],
    },
    {
      name: 'Sugar Rush',
      items: [
        {
          name: 'Chocolate Croissant',
          image: 'https://globalassets.starbucks.com/digitalassets/products'
          + '/food/SBX20220607_ChocolateCroissant-onGreen.jpg?impolicy=1by1_medium_630',
          alt: 'Chocolate Croissant from Starbucks',
          source: 'Starbucks - Chocolate Croissant',
          nutrition: 'Calories: 300 | Protein: 5g | Fat: 18g | Carbs: 34g',
        },
        {
          name: 'Double Chocolate Brownie',
          image: 'https://globalassets.starbucks.com/digitalassets/products/food/SBX201'
          + '90715_DoubleChocolateChunkBrownie.jpg?impolicy=1by1_medium_630',
          alt: 'Double Chocolate Brownie from Starbucks',
          source: 'Starbucks - Double Chocolate Brownie',
          nutrition: 'Calories: 480 | Protein: 6g | Fat: 28g | Carbs: 55g',
        },
        {
          name: 'Caramel Frappuccino',
          image: 'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20220323'
          + '_CaramelFrapp.jpg?impolicy=1by1_wide_topcrop_630',
          alt: 'Caramel Frappuccino from Starbucks',
          source: 'Starbucks - Caramel Frappuccino',
          nutrition: 'Calories: 380 | Protein: 4g | Fat: 15g | Carbs: 67g',
        },
        {
          name: '(1x) Mochi-sadas',
          image: 'https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.honolulumagazine.com/content/uploa'
          + 'ds/2021/01/Mochisada3.jpg',
          alt: 'Mochi-sadas from Quick Bites',
          source: 'Quick Bites - Mochi-sadas',
          nutrition: 'Calories: 82 | Protein: 1g | Fat: 1g | Carbs: 18g',
        },
        {
          name: 'Vanilla Milk Chocolate Almond Ice Cream Bar',
          image: 'https://m.media-amazon.com/images/I/81Fo+8hZbzL._AC_UF894,1000_QL80_.jpg',
          alt: 'Vanilla Milk Chocolate Almond Ice Cream Bar from Quick Bites',
          source: 'Quick Bites - Vanilla Milk Chocolate Almond Ice Cream Bar',
          nutrition: 'Calories: 270 | Protein: 4g | Fat: 19g | Carbs: 20g',
        },
        {
          name: 'Acai Bowl',
          image: 'https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,qualit'
          + 'y=90/media/photos/36ba5d6e-fab3-4cd4-aaea-3805923d1294-retina-large-jpeg',
          alt: 'Acai Bowl from Jamba Juice',
          source: 'Jamba Juice - Acai Bowl',
          nutrition: 'Calories: 500 | Protein: 7g | Fat: 9g | Carbs: 102g',
        },
        {
          name: 'Belgian Waffle',
          image: 'https://www.jamba.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fzqt8'
          + 'tllj2cy0%2F6nNvFHELlrYDxkba8lYAzt%2F6332e52b6e84c5df1e4d252aad7d99ec%2FJAM-Mango_a_go_'
          + 'go_Waffle_thumbnail_1440x933_01.png&w=3840&q=75',
          alt: 'Belgian Waffle from Jamba Juice',
          source: 'Jamba Juice - Belgian Waffle',
          nutrition: 'Calories: 280 | Protein: 4g | Fat: 14g | Carbs: 35g',
        },
        {
          name: 'Footlong Cookie',
          image: 'https://mma.prnewswire.com/media/2287682/Subway_Restaurants_Chocolate_Cookie.jpg?w=2700',
          alt: 'Footlong Cookie from Subway',
          source: 'Subway - Footlong Cookie',
          nutrition: 'Calories: 1330 | Protein: 14g | Fat: 61g | Carbs: 181g',
        },
      ],
    },
  ];

  // Loop through each mood and add items if they don't already exist
  for (const mood of moods) {
    console.log(`  Adding/Updating items to mood: ${mood.name}`);

    // Check if mood exists
    const existingMood = await prisma.mood.findUnique({
      where: { name: mood.name },
      include: { items: true }, // Include items of the mood
    });

    // If the mood exists, add new items or update existing ones
    if (existingMood) {
      for (const item of mood.items) {
        // Check if the item already exists in the mood
        const existingItem = existingMood.items.find(i => i.name === item.name);

        if (!existingItem) {
          // Create new item if it doesn't exist
          await prisma.dashboardItem.create({
            data: {
              name: item.name,
              image: item.image,
              alt: item.alt,
              source: item.source,
              nutrition: item.nutrition,
              moodId: existingMood.id, // Link item to the existing mood
            },
          });
        } else {
          // Update existing item if it already exists
          await prisma.dashboardItem.update({
            where: { id: existingItem.id },
            data: {
              image: item.image, // Update the image URL
              nutrition: item.nutrition, // Update nutrition (or any other field)
            },
          });
        }
      }
    } else {
      console.log(`  Mood "${mood.name}" not found, skipping...`);
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
