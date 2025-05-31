export const categoryMenuList = [
  {
    id: 1,
    title: "Smart Phones",
    src: "/smart phone icon.png",
    href: "/shop/smart-phones",
  },
  {
    id: 2,
    title: "Tablets",
    src: "/tablet icon.png",
    href: "/shop/tablets",
  },
  {
    id: 3,
    title: "Mouses",
    src: "/mouse icon.png",
    href: "/shop/mouses",
  },
  {
    id: 4,
    title: "Cameras",
    src: "/camera icon.png",
    href: "/shop/cameras",
  },
  {
    id: 5,
    title: "Smart Watches",
    src: "/smart watch.png",
    href: "/shop/watches",
  },
  {
    id: 6,
    title: "Laptops",
    src: "/laptop icon.png",
    href: "/shop/laptops",
  },
  {
    id: 7,
    title: "PCs",
    src: "/pc icon.png",
    href: "/shop/computers",
  },
  {
    id: 8,
    title: "Printers",
    src: "/printers icon.png",
    href: "/shop/printers",
  },
  {
    id: 9,
    title: "Earbuds",
    src: "/ear buds icon.png",
    href: "/shop/earbuds",
  },
  {
    id: 10,
    title: "Head Phones",
    src: "/headphone icon.png",
    href: "/shop/headphones",
  },
];

export const incentives = [
  {
    name: "Free Shipping",
    description:
      "Our shipping is completely free and that is completely good for our customers.",
    imageSrc: "/shipping icon.png",
  },
  {
    name: "24/7 Customer Support",
    description:
      "Our support is working all day and night to answer any question you have.",
    imageSrc: "/support icon.png",
  },
  {
    name: "Fast Shopping Cart",
    description:
      "We have super fast shopping experience and you will enjoy it.",
    imageSrc: "/fast shopping icon.png",
  },
];

export const navigation = {
  sale: [
    { name: "Giảm giá", href: "#" },
    { name: "Tin tức", href: "#" },
    { name: "Đăng ký giảm giá", href: "#" },
  ],
  about: [
    { name: "Giới thiệu", href: "#" },
    { name: "Cộng tác với chúng tôi", href: "#" },
    { name: "Hồ sơ công ty", href: "#" },
  ],
  buy: [
    { name: "Thẻ khách hàng thân thiết", href: "#" },
    { name: "Điều khoản sử dụng", href: "#" },
    { name: "Chính sách bảo mật", href: "#" },
    { name: "Khiếu nại", href: "#" },
    { name: "Đối tác", href: "#" },
  ],
  help: [
    { name: "Liên Hệ", href: "#" },
    { name: "Hướng dẫn mua hàng", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};

export const isValidNameOrLastname = (input: string) => {
  // Simple name or lastname regex format check
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(input);
};

export const isValidEmailAddressFormat = (input: string) => {
  // simple email address format check
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};

export const isValidCardNumber = (input: string) => {
  // Remove all non-digit characters
  const cleanedInput = input.replace(/[^0-9]/g, "");
  // test for credit card number between 13 and 19 characters
  const regex = /^\d{13,19}$/;
  return regex.test(cleanedInput);
};

export const isValidCreditCardExpirationDate = (input: string) => {
  // simple expiration date format check
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return regex.test(input);
};

export const isValidCreditCardCVVOrCVC = (input: string) => {
  // simple CVV or CVC format check
  const regex = /^[0-9]{3,4}$/;
  return regex.test(input);
};
