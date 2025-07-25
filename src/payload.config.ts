// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import PracticeAreas from './collections/PracticeAreas'
import Departments from './collections/Departments'
import Team from './collections/Team'
import Publications from './collections/Publications'
import Newsletter from './collections/Newsletter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: './components/admin/Logo',
        Icon: './components/admin/Icon',
      },
    },
    livePreview: {
      url: process.env.NEXT_PUBLIC_PAYLOAD_URL,
      collections: [
        'Media',
        'Newsletter',
        'Publications',
        'Pages',
        'PracticeAreas',
        'Departments',
        'Team',
      ],
    },
    meta: {
      title: 'LilanKichwenKadima LLB',
      description: 'LilanKichwenKadima LLB Official Website',
      icons: [
        {
          rel: 'icon',
          type: 'image/ico',
          url: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          url: '/apple-icon.png',
        },
      ],
      robots: 'noindex, nofollow',
    },
  },
  cors: ['https://lilankichwenkadima.com', 'https://www.lilankichwenkadima.com'],
  collections: [Users, Media, Newsletter, Publications, Pages, PracticeAreas, Departments, Team],
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  // serverURL: 'http://localhost:3000',
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: `${process.env.EMAIL_USER}`,
    defaultFromName: 'LilanKichwenKadima',
    transport: await nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
  }),

  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        email: true,
        number: true,
        payment: false,
        message: true,
      },
      redirectRelationships: ['pages'],
      defaultToEmail: 'email.developer.backend@gmail.com',
      formOverrides: {
        admin: {
          group: 'Forms',
        },
      },
      formSubmissionOverrides: {
        admin: {
          group: 'Forms',
        },
      },
    }),
  ],
})
