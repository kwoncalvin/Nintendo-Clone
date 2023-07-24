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

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
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
