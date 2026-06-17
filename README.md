# 🏢 SURYA'S MiB Intranet Portal

A full-stack intranet platform for internal company operations — employee self-service, admin oversight, and guest access — built with Next.js 16, React 19, and TypeScript.

**Live demo:** [intranet-suryas-w26d.vercel.app](https://intranet-suryas-w26d.vercel.app/)

## Overview

SURYA'S MiB Intranet Portal replaces scattered spreadsheets and email threads with a single role-based system. Employees submit leave requests, allowance claims, and project updates; admins approve or reject them from a centralized dashboard; guests get a scoped, purpose-tracked view of company info.

## Features

**Authentication & Access**
- Role-based login (Admin / Employee / Guest) with route-level access control
- First-login profile setup flow for employees
- Guest purpose-tracking modal (name, company, reason for visit)

**Admin Dashboard**
- Leave and allowance claim approvals
- Project tracking and user management
- Login history and basic analytics

**Employee Tools**
- Leave requests, allowance claims, project creation
- Downloadable forms gallery, certificate requests

**Other**
- UPI QR payment integration
- Company info pages (founder profile, registrations)

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.1.4 | React framework |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Styling |
| **Lucide React** | Latest | Icons |
| **shadcn/ui** | Latest | UI components |
| **Sonner** | Latest | Toast notifications |

## Getting Started

```bash
git clone https://github.com/LashminiAD/intranet_suryas.git
cd intranet_suryas
npm install
npm run dev
```

Create a .env.local file in the root if you need to override the default API URL:

NEXT_PUBLIC_API_URL= `http://localhost:3000`

## User Flows

**Employee** — Login → Homepage → first-time profile setup (role: Intern/Freelancer/Employee) → dashboard access

**Guest** — Login → Homepage → Guest Purpose Modal (name, company, role, purpose of visit) → limited-access dashboard

**Admin** — Login → Homepage → full Admin Dashboard with system-wide control


## 📁 Project Structure

```
suryas-intranet/
├── app/
│   ├── admin-dashboard/        # Main admin console
│   ├── admin/                  # Admin sub-pages
│   │   ├── leave-management/
│   │   ├── ta-claims/
│   │   ├── project-approvals/
│   │   ├── user-management/
│   │   └── reports/
│   ├── login/                  # Login page
│   ├── signup/                 # Registration page
│   ├── homepage/               # Landing page (post-login)
│   ├── dashboard/              # User dashboard
│   ├── forms-gallery/          # Downloadable forms
│   ├── about-founder/          # Company & founder info
│   └── ...other pages
├── components/
│   ├── guest-purpose-modal.tsx # Guest data collection
│   ├── profile-setup-modal.tsx # User profile completion
│   ├── main-layout.tsx         # Master layout
│   ├── events-carousel.tsx     # Events display
│   ├── qr-code-modal.tsx       # Payment QR display
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── auth-context.tsx        # Authentication state
│   └── utils.ts                # Utility functions
└── public/                     # Static assets
```

## 📝 Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/login` | Public | User login |
| `/signup` | Public | New user registration |
| `/homepage` | Authenticated | Landing page |
| `/dashboard` | User/Guest | User dashboard |
| `/admin-dashboard` | Admin | Admin console |
| `/forms-gallery` | All | Downloadable forms |
| `/about-founder` | All | Company information |
| `/leave-form` | User | Submit leave request |
| `/ta-claim` | User | Submit allowance claim |
| `/project-creation` | User | Create projects |
| `/recruitment` | User | Recruitment forms |
| `/sponsorship` | User | Sponsorship requests |
| `/certificate-request` | User | Request certificates |
| `/admin/leave-management` | Admin | Manage leave requests |
| `/admin/ta-claims` | Admin | Manage allowance claims |
| `/admin/project-approvals` | Admin | Approve projects |
| `/admin/user-management` | Admin | Manage users |
| `/admin/reports` | Admin | System reports |

## 🚀 Building & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel
```

## 📝 Environment Variables

Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```


## Troubleshooting

**Dev server won't start (port in use):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Dependency issues:**
```bash
rm -r node_modules package-lock.json
npm install
```

**Build errors / stale cache:**
```bash
rm -r .next
npm run dev
```
### Build Errors
```bash
# Clear Next.js cache
rm -r .next
npm run dev
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)

## 📄 License

⚠️ This is a proprietary project built for SURYA'S MiB Enterprise. Code is shared here for portfolio purposes only. All rights reserved © SURYA'S MiB.

## 👤 Author

**Lashmini AD**
- GitHub: [@LashminiAD](https://github.com/LashminiAD)
- Repository: [intranet_suryas](https://github.com/LashminiAD/intranet_suryas)

---

**Last Updated:** January 22, 2026
**Version:** 2.0 - Full Production Ready
