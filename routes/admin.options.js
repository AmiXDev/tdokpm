const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
AdminBro.registerAdapter(AdminBroMongoose);

const BlogCompany = require('./companies/company.blog');
const UserCompany = require('./companies/company.user');
const AdminCompany = require('./companies/company.admin');
const CategoryCompany = require('./companies/company.category');
const SubCategoryCompany = require('./companies/company.subCategory');

const options = {
    locale: {
        language: 'fa-IR',
        translations: {
            labels: {
                navigation:'فهرست',
                loginWelcome: 'ناحیه مدیریت محتوا',
                mrgoogle: 'تنظیمات مدیریت',
                User: 'کاربران',
                Blog: 'مقالات',
                Admin: 'مدیران',
                selectedRecords: 'انتخاب شده ({{selected}})',
                
            },
            messages: {
                invalidCredentials: 'کلمه عبور یا ایمیل شما اشتباه میباشد.',
                loginWelcome: 'با پنل مدیریت محتوا راحت تر اپلیکیشن آقای گوگل را اداره کنید.',
                welcomeOnBoard_title: 'ناحیه مدیریت محتوای اپلیکیشن آقای گوگل',
                welcomeOnBoard_subtitle: '',
                noRecordsInResource: 'اطلاعاتی یافت نشد.',
            },
            buttons: {
                logout: 'خروج از حساب مدیریت',
                login: 'ورود به حساب مدیریت',
                resetFilter: 'پاک کردن فرم',
                applyChanges: 'فیلتر کردن',
            },
            resources: {
                Blog: {
                    buttons: {
                        filter: 'فیلتر کردن مقالات',
                        save: 'افزودن مقاله جدید',
                        confirmRemovalMany: 'از پاک کردن این {{count}} مقاله مطمئن هستید؟',
                        confirmRemovalMany_plural: 'از پاک کردن این {{count}} مقالات مطمئن هستید؟',
                        createFirstRecord: 'افزودن اولین مقاله',
                    },
                    properties: {
                        title: 'عنوان',
                        slug: 'لینک مقاله',
                        description: 'توضیحات',
                        tags: 'تگها',
                        keywords: 'کلمات کلیدی',
                        updatedAt: 'تاریخ بروزرسانی',
                        createdAt: 'تاریخ انتشار',
                        draftMode: 'حالت پیش نویس'
                    },
                    actions: {
                        new: 'افزودن مقاله جدید',
                        list: 'لیست مقالات',
                        bulkDelete: 'حذف مقالات انتخاب شده',
                        edit: 'ویرایش مقاله',
                        show: 'اطلاعات مقاله',
                        delete: 'حذف مقاله',
                    },
                    messages: { 
                        successfullyBulkDeleted: '{{count}} مقاله با موفقیت حذف شد',
                        successfullyBulkDeleted_plural: '{{count}} از مقالات با موفقیت حذف شدند',
                        successfullyDeleted: 'مقاله مورد نظر با موفقیت حذف شد',
                        successfullyUpdated: 'اطلاعات مقاله مورد نظر با موفقیت بروزرسانی شد',
                       // thereWereValidationErrors: 'بعضی از گزینه ها را نمی توانید خالی بگذارید', 
                        successfullyCreated: 'یک مقاله با موفقیت ایجاد شد.',
                        theseRecordsWillBeRemoved: 'مقاله زیر حذف خواهد شد و امکان بازگشت آن دیگر وجود نخواهد داشت.',
                        theseRecordsWillBeRemoved_plural: 'مقالات زیر حذف خواهند شد و امکان بازگشت آنها دیگر وجود نخواهد داشت.',
                    },
                    labels: {
                        filters: 'فیلتر مقالات',
                    },
                },
                User: {
                    buttons: {
                        filter: 'فیلتر کردن کاربران',
                        save: 'افزودن کاربر جدید',
                        confirmRemovalMany: 'از پاک کردن این {{count}} کاربر مطمئن هستید؟',
                        confirmRemovalMany_plural: 'از پاک کردن این {{count}} کاربران مطمئن هستید؟',
                        createFirstRecord: 'افزودن اولین کاربر',
                    },
                    properties: {
                        phoneNo: 'شماره موبایل',
                        fullName: 'نام و نام خانوادگی',
                        email: 'پست الکترونیکی',
                        address: 'آدرس',
                        password: 'کلمه عبور',
                        webSite: 'وب سایت',
                    },
                    actions: {
                        new: 'افزودن کاربر جدید',
                        list: 'لیست کاربران',
                        bulkDelete: 'حذف کاربران انتخاب شده',
                        edit: 'ویرایش کاربر',
                        show: 'اطلاعات کاربر',
                        delete: 'حذف کاربر',
                    },
                    messages: { 
                        successfullyBulkDeleted: '{{count}} کاربر با موفقیت حذف شد',
                        successfullyBulkDeleted_plural: '{{count}} از کاربران با موفقیت حذف شدند',
                        successfullyDeleted: 'کاربر مورد نظر با موفقیت حذف شد',
                        successfullyUpdated: 'اطلاعات کاربر مورد نظر با موفقیت بروزرسانی شد',
                        thereWereValidationErrors: 'بعضی از گزینه ها را نمی توانید خالی بگذارید', 
                        successfullyCreated: 'یک کاربر با موفقیت ایجاد شد.',
                        theseRecordsWillBeRemoved: 'کابر زیر حذف خواهد شد و امکان بازگشت آن دیگر وجود نخواهد داشت.',
                        theseRecordsWillBeRemoved_plural: 'کابران زیر حذف خواهند شد و امکان بازگشت آنها دیگر وجود نخواهد داشت.',
                    },
                    labels: {
                        filters: 'فیلتر کاربران',
                    }
                },
                Admin: {
                    buttons: {
                        filter: 'فیلتر کردن مدیران',
                        save: 'افزودن مدیر جدید',
                        confirmRemovalMany: 'از پاک کردن این {{count}} مدیر مطمئن هستید؟',
                        confirmRemovalMany_plural: 'از پاک کردن این {{count}} مدیران مطمئن هستید؟',
                        createFirstRecord: 'افزودن اولین مدیر',
                        
                    },
                    properties: {
                        email: 'پست الکترونیکی',
                        fullName: 'نام و نام خانوادگی',
                        role: 'رتبه مدیر',
                        admin: 'مدیر ارشد',
                        restricted: 'مدیر محدود شده',
                        password: 'کلمه عبور',
                    },
                    actions: {
                        new: 'افزودن مدیر جدید',
                        list: 'لیست مدیران',
                        bulkDelete: 'حذف مدیران انتخاب شده',
                        edit: 'ویرایش مدیر',
                        show: 'اطلاعات مدیر',
                        delete: 'حذف مدیر',
    
                    },
                    labels: {
                        filters: 'فیلتر مدیران',
                    },
                    messages: {
                        confirmRemovalMany: 'مطمئن هستید از پاک کردن {{count}} مدیر',
                        successfullyUpdated: 'اطلاعات مدیر مورد نظر با موفقیت بروزرسانی شد',
                        theseRecordsWillBeRemoved: 'مدیر زیر حذف خواهد شد و امکان بازگشت آن دیگر وجود نخواهد داشت.',
                        theseRecordsWillBeRemoved_plural: 'مدیران زیر حذف خواهند شد و امکان بازگشت آنها دیگر وجود نخواهد داشت.',
                    }
                },
                Category: {
                    properties: {
                        name: 'نام دسته',
                        slugs: 'نامک',
                        shortDescription: 'توضیحات دسته',
                        subCategoryArray: 'افزودن زیر دسته',
                        'subCategoryArray.subCategoryName': 'نام زیر دسته',
                        'subCategoryArray.subCategorySlug': 'نامک زیر دسته',
                        'subCategoryArray.subCategoryShortDescription': 'توضیحات زیر دسته',

                    }
                },
            }
        }
    },
    resources: [AdminCompany, UserCompany, BlogCompany, CategoryCompany, SubCategoryCompany],
    assets: {
        styles: [
          '/admin-styles/custom-admin.css',
          '/admin-styles/fonts.css',
        ]
    },
      rootPath: '/admin',
        branding: {
            softwareBrothers: false,
            logo: '/images/icons/mrgoogle-logo.svg',
            companyName: 'مستر گوگل',
        theme: {
            
            }
        },
};

module.exports = options;
