import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="container py-16 sm:py-24 md:py-32">
      <div className="relative overflow-hidden rounded-3xl bg-purple-600 px-6 py-16 sm:px-12 sm:py-20 md:px-16 md:py-24 text-center">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
            আপনার মাতৃত্বকালীন স্বাস্থ্যসেবায় <br /> পরিবর্তন আনতে প্রস্তুত?
          </h2>
          <p className="max-w-[42rem] text-lg sm:text-xl text-purple-100 leading-relaxed">
            মা সাথী এআই-এর সাথে যুক্ত হোন এবং আধুনিক এআই প্রযুক্তির মাধ্যমে আপনার মাতৃত্বকালীন স্বাস্থ্যসেবাকে আরও উন্নত করুন।
          </p>
          <Button
            size="lg"
            className="h-14 px-10 text-lg bg-white text-purple-600 hover:bg-purple-50 rounded-full shadow-xl transition-all hover:scale-105"
          >
            আজই শুরু করুন
          </Button>
        </div>
      </div>
    </section>
  )
}

