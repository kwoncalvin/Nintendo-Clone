from app.models import db, Product, environment, SCHEMA
import datetime
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    product1 = Product(
        user_id = 1,
        name = 'Pikmin™ 1',
        price = 29.99,
        description_header = 'Find your way home in the original Pikmin-plucking adventure',
        description = 'Meet Captain Olimar and a capable cast of red, blue, and yellow Pikmin on a dire mission across a larger-than-life planet. Olimar must guide his loveably-leafy companions through obstacles, in battle, and when collecting his missing ship parts.',
        release_date = datetime.date(2023, 6, 21),
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1128785388983566436/f914703be359d59c4fced6c076adce7eae9ddbbdd0cfa13a10d008ae154c9b61.png',
        desc_image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1132823885532909688/Pikmin1_char.png',
        category = 'game',
        esrb = 'everyone 10+',
        color = '#efecdb'
    )
    product2 = Product(
        user_id = 1,
        name = 'The Legend of Zelda™: Tears of the Kingdom',
        price = 69.99,
        description_header = 'Explore the vast land—and skies—of Hyrule',
        description = "An epic adventure awaits in the Legend of Zelda: Tears of the Kingdom game, only on the Nintendo Switch system. In this sequel to the Legend of Zelda: Breath of the Wild game, you'll decide your own path through the sprawling landscapes of Hyrule and the mysterious islands floating in the vast skies above. Can you harness the power of Link's new abilities to fight back against the malevolent forces that threaten the kingdom?",
        release_date = datetime.date(2023, 5, 12),
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1128785139095314484/276a412988e07c4d55a2996c6d38abb408b464413b2dfeb44d2aa460b9f622e1.png',
        desc_image_url = 'https://cdn.discordapp.com/attachments/1128785113287753760/1132824821638635580/link-highlight.png',
        category = 'game',
        esrb = 'everyone 10+',
        color = '#18473d'

    )
    product3  =  Product(
        user_id = 1,
        name = 'Xenoblade Chronicles™ 3',
        price = 59.99,
        description_header = 'Live to fight. Fight to live.',
        description = "Join Noah and Mio, members of the two opposing nations of Keves and Agnus, on a heartfelt journey through a warring world with a dark secret. Traverse massive, fantastical landscapes and master seamless real-time RPG combat as you expose the true enemy pulling the strings.",
        release_date = datetime.date(2022, 7, 29),
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1128785546060238968/e933b48650b33b355e9cf2583da5c94b77180e40fb02d050041083dd62f4df39.png',
        desc_image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1128785546060238968/e933b48650b33b355e9cf2583da5c94b77180e40fb02d050041083dd62f4df39.png',
        category = 'game',
        esrb = 'teen'
    )
    product4  =  Product(
        user_id = 1,
        name = 'Pokémon™ Scarlet',
        price = 59.99,
        description_header = 'Welcome to the wide-open world of the Paldea region',
        description = "Catch, battle, and train Pokémon in the Paldea Region, a vast land filled with lakes, towering peaks, wastelands, small towns, and sprawling cities. Explore a wide-open world at your own pace and traverse land, water, and air by riding on a form-shifting Legendary Pokémon—Koraidon in Pokémon Scarlet and Miraidon in Pokémon Violet. Choose either Sprigatito, Fuecoco, or Quaxly, to be your first partner Pokémon before setting off on your journey through Paldea.",
        release_date = datetime.date(2022, 11, 18),
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133032389963153569/849c234de8df7265201d26d9d72f88eed3f32438d3dca12fc135beb4c3befc85.png',
        desc_image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133032564706250852/9e78551e9143c33808225efd398d378b3f73dcd8b812cd07aee9e496a66bcf9b.png',
        category = 'game',
        esrb = 'everyone',
        color = '#7f1d2f'
    )
    product5  =  Product(
        user_id = 1,
        name = 'Nintendo Switch Lite - Gray',
        price = 199.99,
        description_header = 'Dedicated to handheld play',
        description = "The Nintendo Switch Lite system is a small and light system at a great price. With a built-in +Control Pad, and a sleek, unibody design, this system is great for on-the-go gaming.",
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133025366680801351/110672-nintendo-switch-lite-gray-edition-package-1200x675.png',
        desc_image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133025456724119563/lite-main-1.png',
        category = 'hardware',
        color = '#727272'
    )
    product6  =  Product(
        user_id = 1,
        name = 'Protection Case - Champions of Hyrule',
        price = 19.99,
        description_header = 'Take your Nintendo Switch - OLED Model, Nintendo Switch or Nintendo Switch Lite on the go with this sturdy compact case designed to fit the console in handheld mode.',
        description = "Inside you'll find a felt lining, screen-protector flap with storage for nine game cards, logo tag and zippered mesh storage pocket. This portable case gives you the freedom to have fun on the go with your Nintendo Switch. Wherever. Whenever.",
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133033468381626499/117926-powera-protection-case-champions-of-hyrule-front-1200x675.png',
        desc_image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133033514695139388/117926-powera-protection-case-champions-of-hyrule-open-oled-1200x675.png',
        category = 'hardware',
        color = '#727272'
    )
    product7  =  Product(
        user_id = 1,
        name = 'Joy-Con™ (L)/(R) Pastel Purple / Pastel Green',
        price = 79.99,
        description_header = 'Kick off a stylish summer with new pastel Joy-Con controllers',
        description = "Start off your summer in style with this new line of pastel Joy-Con. Whether you're on vacation or at a family barbecue, you'll be looking cool with these colorful controllers! Games come to life through easy-to-use motion controls and HD rumble—advanced vibration features built into each Joy-Con. Depending on the game, you might use a single Joy-Con in each hand—or even give the second one to a friend. Includes one Pastel Purple Joy-Con (L), one Pastel Green Joy-Con (R), and two Black Joy-Con wrist straps.",
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133034633341182024/117078-nintendo-switch-joy-con-set-pastel-purple-l-pastel-green-r-1200x675.png',
        desc_image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133034720570114250/117078-nintendo-switch-joy-con-set-pastel-purple-l-pastel-green-r-box-1200x675.png',
        category = 'hardware',
        color = '#727272'
    )
    product8  =  Product(
        user_id = 1,
        name = 'Animal Crossing amiibo Cards - Series 1',
        price = 5.99,
        description_header = 'Animal Crossing is filled with characters who have lots of humor and personality, and now you can get to know them better with amiibo cards.',
        description = "Reunite with old friends, or even discover new ones with this pack of 6 Animal Crossing amiibo cards. Browse the characters and make printable lists with the amiibo card catalog. Set includes a random selection of Animal Crossing characters plus 1 Special Character.",
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133035086477021264/102431-nintendo-amiibo-animal-crossing-card-set-1-package-1200x675.png',
        desc_image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133035161534079031/102431-nintendo-amiibo-animal-crossing-card-set-1-fan-1200x675.png',
        category = 'hardware',
        color = '#727272'
    )
    product9  =  Product(
        user_id = 1,
        name = 'Splatoon - Royal Blue T-Shirt',
        price = 19.99,
        description_header = 'Dive right into the action with this super-comfy Splatoon™ T-shirt featuring an orange Inkling swimming across a royal blue background.',
        description = "Materials: 60% polyester, 40% cotton. Care instructions: Machine wash in cold water with like colors. No bleach. Tumble dry low. Do not iron decoration.",
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133035629047975936/116383-splatoon-orange-squid-t-shirt-blue-front-1200x675.png',
        desc_image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133035629047975936/116383-splatoon-orange-squid-t-shirt-blue-front-1200x675.png',
        category = 'merchandise',
        color = '#3946a0'
    )
    product10  =  Product(
        user_id = 1,
        name = 'The Super Mario Bros. Movie - 7” Feature Bowser with Fire Breathing Effects',
        price = 29.99,
        description_header = 'Bring The Super Mario Bros. Movie 7” Bowser figure to life with his fire breathing effect!',
        description = "Inspired by the movie, Bowser comes with premium details and 15 points of articulation.  Activate the “fire breathing” feature by adding water to Bowser's reservoir on the back of his hair using the included dropper, then pressing the side spike - watch as illuminated atomized vapor shoots from his mouth!  Comes in a premium window box.",
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133036126475649134/119336-jakks-super-mario-bros-bowser-7inch-front-1200x675.png',
        desc_image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133036227294154792/119336-jakks-super-mario-bros-bowser-7inch-front-left-1200x675.png',
        category = 'merchandise',
        color = '#3946a0'
    )
    product11  =  Product(
        user_id = 1,
        name = 'Mega Mocchi Plush - Legend of Zelda - Korok',
        price = 34.99,
        description_header = "Hide out and snuggle up with your new forest friend—The Legend of Zelda's Korok from Club Mocchi- Mocchi-!",
        description = "Designed in Japan, Mocchi- Mocchi- is super soft and huggable! Unlike other ordinary plush, it has a unique squishy texture and is super soft to touch. The Legend of Zelda series features fan-favorite characters from the iconic Nintendo® games. Collect them all!",
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133037051240005682/114226-tomy-mega-mocchi-plush-legend-of-zelda-korok-front-view-1200x675.png',
        desc_image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133037200997621790/114226-tomy-mega-mocchi-plush-legend-of-zelda-korok-back-view-1200x675.png',
        category = 'merchandise',
        color = '#3946a0'
    )
    product12  =  Product(
        user_id = 1,
        name = 'LEGO® Super Mario™ Master Your Adventure Maker Set',
        price = 59.99,
        description_header = 'Enhance your LEGO® Super Mario™ experience and create unique levels with this Maker Set!',
        description = "Choose rewards for LEGO® Mario™ (figure not included) with the Customization Time Block and Customization Item Blocks. Build new challenges and introduce Larry and a Goomba, Bob-omb and Koopa Paratroopa to the play. Add the Special Pipe: Dash 30 and try to finish your level in 30 seconds to win more coins!",
        image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133037543047311460/114983-lego-super-mario-master-your-adventure-maker-set-box-front-1200x675.png',
        desc_image_url = 'https://media.discordapp.net/attachments/1128785113287753760/1133037603428519937/114983-lego-super-mario-master-your-adventure-maker-set-characters-1200x675.png',
        category = 'merchandise',
        color = '#3946a0'
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
