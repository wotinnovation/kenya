export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Address = {
  __typename?: 'Address';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type AppConfig = {
  __typename?: 'AppConfig';
  homeBanners?: Maybe<Array<Maybe<CarouselItem>>>;
  homeCarousel?: Maybe<Array<Maybe<CarouselItem>>>;
  onboardingSlides?: Maybe<Array<Maybe<OnboardingSlide>>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Attribute = {
  __typename?: 'Attribute';
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  variation?: Maybe<Scalars['Boolean']['output']>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  customer?: Maybe<Customer>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type BillingAddress = {
  __typename?: 'BillingAddress';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type Brand = {
  __typename?: 'Brand';
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type CarouselItem = {
  __typename?: 'CarouselItem';
  btnText?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  titleLine1?: Maybe<Scalars['String']['output']>;
  titleLine2?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  children?: Maybe<Array<Maybe<Category>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Category>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Contact = {
  __typename?: 'Contact';
  contactID?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  ipAddress?: Maybe<Scalars['String']['output']>;
  isRead?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
};

export type ContactInput = {
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  address?: Maybe<Scalars['String']['output']>;
  billingAddress?: Maybe<Address>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isEmailVerified?: Maybe<Scalars['Boolean']['output']>;
  isPhoneVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  shippingAddress?: Maybe<Address>;
  state?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type CustomerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  billingAddress?: InputMaybe<AddressInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<AddressInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type Dimensions = {
  __typename?: 'Dimensions';
  height?: Maybe<Scalars['Float']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<Scalars['Boolean']['output']>;
  createContact?: Maybe<Contact>;
  createCustomer?: Maybe<Customer>;
  createOrder?: Maybe<Order>;
  deleteAccount?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<AuthPayload>;
  resendOTP?: Maybe<Scalars['Boolean']['output']>;
  submitContact?: Maybe<Scalars['String']['output']>;
  toggleCustomerStatus?: Maybe<Customer>;
  updateCustomer?: Maybe<Customer>;
  verifyDetails?: Maybe<Customer>;
  verifyOTP?: Maybe<AuthPayload>;
};


export type MutationChangePasswordArgs = {
  id: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateContactArgs = {
  input: ContactInput;
};


export type MutationCreateCustomerArgs = {
  input: CustomerInput;
};


export type MutationCreateOrderArgs = {
  input: OrderInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
};


export type MutationResendOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationSubmitContactArgs = {
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationToggleCustomerStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCustomerArgs = {
  id: Scalars['ID']['input'];
  input: CustomerInput;
};


export type MutationVerifyDetailsArgs = {
  id: Scalars['ID']['input'];
  verifyEmail?: InputMaybe<Scalars['Boolean']['input']>;
  verifyPhone?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationVerifyOtpArgs = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type OnboardingSlide = {
  __typename?: 'OnboardingSlide';
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Order = {
  __typename?: 'Order';
  billingAddress?: Maybe<BillingAddress>;
  createdAt?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<Customer>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  items?: Maybe<Array<Maybe<OrderItem>>>;
  modifiedAt?: Maybe<Scalars['String']['output']>;
  orderID?: Maybe<Scalars['String']['output']>;
  orderSource?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  paymentStatus?: Maybe<Scalars['String']['output']>;
  paymentUrl?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Maybe<OrderItem>>>;
  shippingAddress?: Maybe<ShippingAddress>;
  shippingCost?: Maybe<Scalars['Float']['output']>;
  shippingMethod?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subtotalAmount?: Maybe<Scalars['Float']['output']>;
  totalAmount?: Maybe<Scalars['Float']['output']>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  vatAmount?: Maybe<Scalars['Float']['output']>;
  vatPercentage?: Maybe<Scalars['Float']['output']>;
};

export type OrderBillingAddressInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type OrderInput = {
  billingAddress?: InputMaybe<OrderBillingAddressInput>;
  callbackUrl?: InputMaybe<Scalars['String']['input']>;
  customer?: InputMaybe<Scalars['ID']['input']>;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  items?: InputMaybe<Array<InputMaybe<OrderItemInput>>>;
  note?: InputMaybe<Scalars['String']['input']>;
  orderSource?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<InputMaybe<OrderItemInput>>>;
  shippingAddress?: InputMaybe<OrderShippingAddressInput>;
  shippingCost?: InputMaybe<Scalars['Float']['input']>;
  shippingMethod?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  subtotalAmount?: InputMaybe<Scalars['Float']['input']>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
  vatAmount?: InputMaybe<Scalars['Float']['input']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']['output']>;
  variation?: Maybe<Scalars['String']['output']>;
};

export type OrderItemInput = {
  price?: InputMaybe<Scalars['Float']['input']>;
  product?: InputMaybe<Scalars['ID']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  variation?: InputMaybe<Scalars['String']['input']>;
};

export type OrderShippingAddressInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type Page = {
  __typename?: 'Page';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaKeywords?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaKeywords?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PriceRange = {
  __typename?: 'PriceRange';
  display?: Maybe<Scalars['String']['output']>;
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
};

export type Product = {
  __typename?: 'Product';
  attributes?: Maybe<Array<Maybe<Attribute>>>;
  brand?: Maybe<Brand>;
  calories?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<Category>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dimensions?: Maybe<Dimensions>;
  enableReviews?: Maybe<Scalars['Boolean']['output']>;
  gallery?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  ingredients?: Maybe<Scalars['String']['output']>;
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  manageStock?: Maybe<Scalars['Boolean']['output']>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  priceRange?: Maybe<PriceRange>;
  purchaseNote?: Maybe<Scalars['String']['output']>;
  regularPrice?: Maybe<Scalars['Float']['output']>;
  salePrice?: Maybe<Scalars['Float']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  stockStatus?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  variations?: Maybe<Array<Maybe<Variation>>>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  page?: Maybe<Scalars['Int']['output']>;
  pages?: Maybe<Scalars['Int']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  appConfig?: Maybe<AppConfig>;
  brand?: Maybe<Brand>;
  brands?: Maybe<Array<Maybe<Brand>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  featuredProducts?: Maybe<Array<Maybe<Product>>>;
  order?: Maybe<Order>;
  orders?: Maybe<Array<Maybe<Order>>>;
  page?: Maybe<Page>;
  pageBySlug?: Maybe<Page>;
  pages?: Maybe<Array<Maybe<Page>>>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
  product?: Maybe<Product>;
  products?: Maybe<ProductConnection>;
  settings?: Maybe<Setting>;
  verifyAuth?: Maybe<AuthPayload>;
  verifyCustomer?: Maybe<Customer>;
};


export type QueryBrandArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBrandsArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoriesArgs = {
  parent?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFeaturedProductsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  customer?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPageBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPagesArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  brand?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVerifyCustomerArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Setting = {
  __typename?: 'Setting';
  belowThresholdCost?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  flatShippingCost?: Maybe<Scalars['Float']['output']>;
  freeShippingThreshold?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymobEnabled?: Maybe<Scalars['Boolean']['output']>;
  paymobTitle?: Maybe<Scalars['String']['output']>;
  searchEngineVisibility?: Maybe<Scalars['Boolean']['output']>;
  shippingEnabled?: Maybe<Scalars['Boolean']['output']>;
  shippingType?: Maybe<Scalars['String']['output']>;
  siteAddress?: Maybe<Scalars['String']['output']>;
  siteEmail?: Maybe<Scalars['String']['output']>;
  siteName?: Maybe<Scalars['String']['output']>;
  sitePhone?: Maybe<Scalars['String']['output']>;
  vatPercentage?: Maybe<Scalars['Float']['output']>;
};

export type ShippingAddress = {
  __typename?: 'ShippingAddress';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type Variation = {
  __typename?: 'Variation';
  attributes?: Maybe<Array<Maybe<VariationAttribute>>>;
  dimensions?: Maybe<Dimensions>;
  image?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  regularPrice?: Maybe<Scalars['Float']['output']>;
  salePrice?: Maybe<Scalars['Float']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  stockStatus?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type VariationAttribute = {
  __typename?: 'VariationAttribute';
  name?: Maybe<Scalars['String']['output']>;
  option?: Maybe<Scalars['String']['output']>;
};
