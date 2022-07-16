export interface Experiences {
  date: string;
  year: string;
  exp: Experince[];
}

export interface Experince {
  type: string;
  data: Data[];
}

export interface Data {
  type: string;
  description: string;
}

export interface Works {
  date: string;
  year: string;
  projectType: string;
  projectName: string;
  image: string;
  albums: [string];
}

export const YearIImages = [
  "/images/year2/i-1.png",
  "/images/year2/i-2.png",
  "/images/year2/i-3.png",
  "/images/year2/i-4.png",
];

export const Year3Images = ["/images/year3/i-1.png", "/images/year3/i-2.png"];

export const Year4Images = [
  "/images/year4/i-1.png",
  "/images/year4/i-2.png",
  "/images/year4/i-3.png",
  "/images/year4/i-4.png",
  "/images/year4/i-5.png",
];

export const property = {
  imageUrl: "https://bit.ly/2Z4KKcF",
  imageAlt: "Rear view of modern home with pool",
  beds: 3,
  baths: 2,
  title: "Modern home in city center in the heart of historic Los Angeles",
  formattedPrice: "$1,900.00",
  reviewCount: 34,
  rating: 4,
};

export const works = [
  {
    date: "2019 - 2020",
    year: "2",
    projectType: "Spring Boot",
    projectName: "UBlog News",
    image: "/images/i-1.png",
    albums: YearIImages,
  },
  {
    date: "2020 - 2021",
    year: "3",
    projectType: "Android Studio",
    projectName: "Coin Hub",
    image: "/images/i-2.png",
    albums: Year3Images,
  },
  {
    date: "2021 - 2022",
    year: "4",
    projectType: "Flutter Framework",
    projectName: "Smart Classroom",
    image: "/images/i-3.png",
    albums: Year4Images,
  },
];

export const experiences = [
  {
    date: "2019 - 2020",
    year: "2",
    exp: [
      {
        type: "Java",
        data: [
          {
            type: "Java",
            description: "Programming Language",
          },
          {
            type: "MySQL",
            description: "Databasse",
          },
          {
            type: "Spring Boot",
            description: "Java Framework",
          },
        ],
      },

      {
        type: "Php",
        data: [
          {
            type: "Php",
            description: "Programming Language",
          },
          {
            type: "SQL",
            description: "Query Language",
          },
          {
            type: "Laravel",
            description: "Php Framework",
          },
        ],
      },
    ],
  },
  {
    date: "2020 - 2021",
    year: "3",
    exp: [
      {
        type: "Android Studio",
        data: [
          {
            type: "Android",
            description: "Android Mobile App",
          },
          {
            type: "SQLite",
            description: "Mobile Internal Database",
          },
          {
            type: "Retrofit Package",
            description: "API request POST - GET - UPDATE - DELETE",
          },
        ],
      },
      {
        type: "Node Js",
        data: [
          {
            type: "Node Js",
            description: "Run Time Javascript",
          },
          {
            type: "Javascript",
            description: "Programming Language",
          },
        ],
      },
      {
        type: "React Js",
        data: [
          {
            type: "React Js",
            description: "Web Frontend Framework",
          },
          {
            type: "Materialize Css",
            description: "Web Css Framework",
          },
          {
            type: "React Router V6",
            description: "Routing ",
          },
        ],
      },

      {
        type: "Backend Poilerplate",
        data: [
          {
            type: "Node Js",
            description: "Run Time Javascript",
          },
          {
            type: "Express Js",
            description: "Local Server Side",
          },
          {
            type: "GrpahQL",
            description: "Query Language",
          },
          {
            type: "Typescript",
            description: "Programming Language",
          },
          {
            type: "MySQL",
            description: "Database store Data",
          },
          {
            type: "TypeOrm",
            description: "Orm Repository / Orm Manager",
          },
        ],
      },
      {
        type: "Next Js",
        data: [
          {
            type: "Next Js",
            description: "React Framework",
          },
          {
            type: "Chakra UI",
            description: "Web Css Framework",
          },
          {
            type: "Framer Motion",
            description: "Web Frontend Motion / Enimation",
          },
        ],
      },
    ],
  },
  {
    date: "2021 - 2022",
    year: "4",
    exp: [
      {
        type: "Flutter",
        data: [
          {
            type: "Flutter ",
            description: "Mobile App Framework",
          },
          {
            type: "Graphql Flutter",
            description: "Graphql Client Query & Mutate",
          },
          {
            type: "Cloudinary ",
            description: "Store Images/Video Online",
          },
        ],
      },

      {
        type: "Raspberry PI",
        data: [
          {
            type: "Raspberry PI",
            description: "Small Computer for developer",
          },
          {
            type: "RPIO",
            description: "Package Control On Raspberry PI Pin",
          },
          {
            type: "Python",
            description: "Programming Language",
          },
        ],
      },
    ],
  },
];
