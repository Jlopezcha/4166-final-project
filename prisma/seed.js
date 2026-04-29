import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


try {
    if(isDev){
        await prisma.$queryRaw`TRUNCATE 
        "users", "technology", "technologyRentals", "books", 
        "bookRentals", "academicPapers", "academicRentals", "authors" RESTART IDENTITY CASCADE;`; 
    }
    
    const userCount = await prisma.Users.count();
    const technologyCount = await prisma.Technology.count();
    const bookCount = await prisma.Books.count();
    const papersCount = await prisma.Academic_Papers.count();
    const authorCount = await prisma.Authors.count();


    if(userCount == 0){
      const usersData = [
        {
          name: 'Alice',
          email: 'alice@test.com',
          password: 'alice1234',
          role: 'ADMIN',
        },
        { name: 'Bob', email: 'bob@test.com', password: 'bob1234' },
        { name: 'Charlie', email: 'charlie@test.com', password: 'charlie1234' },
        { name: 'Megan', email: 'megan@test.com', password: 'meg1234' }
      ];

      const users = [];

      for (const info of usersData) {
        const hashedPassword = await bcrypt.hash(info.password, 10);

        const user = await prisma.Users.create({
          data: {
            name: info.name,
            email: info.email,
            password: hashedPassword,
            role: info.role || 'USER',
          },
        });

        users.push(user);
      }
      
    }


    if(technologyCount == 0){
        await prisma.Technology.createMany({
            data: [
                {
                    product_name: 'Apple Ipad 11th (A16)',
                    category: ['educational', 'entertainment', 'home', 'music', 'tablet'],
                    availability: 20,
                    product_year: 2025, 
                },
                {
                    product_name: 'Apple Ipad Pro (M4)',
                    category: ['educational', 'entertainment', 'home', 'music', 'tablet'],
                    availability: 10,
                    product_year: 2024, 
                },
                {
                    product_name: 'Sony WH-1000XM5',
                    category: ['music', 'entertainment', 'headphones'],
                    availability: 30,
                    product_year: 2022, 
                },
                {
                    product_name: 'Lenovo ThinkPad X1 Gen 13',
                    category: ['educational', 'entertainment', 'work', 'home', 'music', 'laptop'],
                    availability: 15,
                    product_year: 2021, 
                },
                {
                    product_name: 'Asus Zenbook a14',
                    category: ['educational', 'entertainment', 'work', 'home', 'music', 'laptop'],
                    availability: 23,
                    product_year: 2025,  
                },
                {
                    product_name: 'HP monitor',
                    category: ['work', 'home', 'monitor', 'accessory'],
                    availability: 40,
                    product_year: 2024, 
                },
                {
                    product_name: 'USB C charger',
                    category: ['accessory', 'charger'],
                    availability: 100,
                    product_year: 2023, 
                },
                {
                    product_name: 'Surge protector',
                    category: ['accessory', 'power'],
                    availability: 93,
                    product_year: 2023,
                }

            ],
        })
    }

    
    if(authorCount == 0 && bookCount == 0 && papersCount == 0){
        await prisma.Authors.createMany({
            data: [
                {
                    name: 'Roberto Tamassia'
                },
                {
                    name: 'Ashish Vaswani'
                },
                {
                    name: 'Brian W. Kernighan'
                },
                {
                    name: 'Dennis M Ritchie'
                },
                {
                    name: 'Geoffrey E Hinton'
                },
                {
                    name: 'Niki Parmar'
                }
            ],
        });


        const authors = await prisma.Authors.findMany();

        await prisma.Academic_Papers.create({
            data: {
                name: 'Algorithms for Drawing Graphs: an Annotated Bibliography',
                topic: ['computer science', 'algorithms'],
                availability: 40,
                authors: {connect: [{id: authors[0].id}]},
            }
        });

        await prisma.Academic_Papers.create({
            data: {
                name: 'Attention is All You Need',
                topic: ['computer science', 'aritifical intelligence'],
                availability: 90,
                authors: {connect: [{id: authors[1].id}, {id: authors[5].id}]},
            }
        });

        await prisma.Academic_Papers.create({
            data: {
                name: 'Imagenet classification with deep convolutional neural networks',
                topic: ['computer science', 'aritifical intelligence'],
                availability: 3,
                authors: {connect: [{id: authors[4].id}]},
            }
        });

    
        // await prisma.Books.createMany({
        //     data: [
        //         {
        //             name: 'Algorithm Design: Foundations, Analysis, and Internet Examples',
        //             topic: ['computer science', 'algorithms', 'JAVA'],
        //             availability: 120,
        //             authors: {connect: [{id: authors[0].id}]},
        //         },
        //         {
        //             name: 'The C Programming Language',
        //             topic: ['computer science', 'algorithms', 'UNIX', 'C'],
        //             availability: 134,
        //             authors: {connect: [{id: authors[2].id}, {id: authors[3].id}] }, 
        //         },
        //         {
        //             name: 'The Unix Programming Environment',
        //             topic: ['computer science', 'UNIX', 'C'],
        //             availability: 74,
        //             authors: {connect: [{id: authors[2].id}]}, 
        //         }
        //     ]
        // });

        await prisma.Books.create({
            data: {
                name: 'Algorithm Design: Foundations, Analysis, and Internet Examples',
                genre: ['computer science', 'algorithms', 'JAVA'],
                availability: 120,
                authors: {connect: [{id: authors[0].id}]},
            }
        });

        await prisma.Books.create({
            data: {
                name: 'The C Programming Language',
                genre: ['computer science', 'algorithms', 'UNIX', 'C'],
                availability: 134,
                authors: {connect: [{id: authors[2].id}, {id: authors[3].id}] },
            }
        });

        await prisma.Books.create({
            data: {
                name: 'The Unix Programming Environment',
                genre: ['computer science', 'UNIX', 'C'],
                availability: 74,
                authors: {connect: [{id: authors[2].id}]}, 
            }
        });

    }

    console.log('Seed completed successfully!');
} catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
} finally{
    await prisma.$disconnect();
}