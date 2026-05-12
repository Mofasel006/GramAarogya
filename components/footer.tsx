import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">মা সাথী এআই</h2>
          <p className="text-sm text-muted-foreground">মাতৃত্বকালীন এবং গ্রামীণ স্বাস্থ্যসেবায় বিপ্লব আনা</p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">সমাধান</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/health-check" className="text-muted-foreground transition-colors hover:text-primary">
                  আরোগ্য এআই
                </Link>
              </li>
              <li>
                <Link href="/find-doctor" className="text-muted-foreground transition-colors hover:text-primary">
                  আরোগ্যকানেক্ট
                </Link>
              </li>
              <li>
                <Link href="/g-map" className="text-muted-foreground transition-colors hover:text-primary">
                  আরোগ্যম্যাপ
                </Link>
              </li>
              <li>
                <Link href="/news-help" className="text-muted-foreground transition-colors hover:text-primary">
                  আরোগ্যপালস
                </Link>
              </li>
              <li>
                <Link href="/health-insights" className="text-muted-foreground transition-colors hover:text-primary">
                  আরোগ্যভিউ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">যোগাযোগ</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/Mofasel006"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://bd.linkedin.com/in/mofasel"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} মা সাথী এআই
        </p>
      </div>
    </footer>
  )
}

