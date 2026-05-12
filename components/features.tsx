import { HeartPulse, Languages, MapPin, Stethoscope } from "lucide-react";

const features = [
  {
    name: "এআই-চালিত চিকিৎসা সহায়তা",
    description:
      "আমাদের এআই উপসর্গ বিশ্লেষণ করে এবং প্রাথমিক রোগ নির্ণয় প্রদান করে, যা ব্যবহারকারীদের দ্রুত তাদের স্বাস্থ্য পরিস্থিতি বুঝতে সাহায্য করে।",
    icon: HeartPulse,
  },
  {
    name: "বহুভাষিক সহায়তা",
    description:
      "রিয়েল-টাইম অনুবাদের মাধ্যমে ভাষার বাধা দূর করুন, যাতে সবাই তাদের পছন্দের ভাষায় চিকিৎসা সহায়তা পেতে পারে।",
    icon: Languages,
  },
  {
    name: "অবস্থান ভিত্তিক ডাক্তার ম্যাচিং",
    description:
      "জিপিএস প্রযুক্তি ব্যবহার করে নিকটস্থ ডাক্তার এবং চিকিৎসা কেন্দ্র খুঁজে বের করুন, সঠিক সময়ে সহায়তা নিশ্চিত করুন।",
    icon: MapPin,
  },
  {
    name: "ডাক্তারের সাথে সহজ যোগাযোগ",
    description:
      "ভিডিও কল বা চ্যাটের মাধ্যমে স্বাস্থ্যসেবা পেশাদারদের সাথে তাৎক্ষণিকভাবে যুক্ত হোন দূরবর্তী পরামর্শের জন্য।",
    icon: Stethoscope,
  },
];

export default function Features() {
  return (
    <section className="container px-4 space-y-12 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.2] sm:text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          মাতৃত্বকালীন স্বাস্থ্যসেবায় নতুন দিগন্ত
        </h2>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          মা সাথী এআই-এর আধুনিক চিকিৎসা সমাধান, বহুভাষিক সহায়তা এবং স্বাস্থ্যসেবা পেশাদারদের তাৎক্ষণিক ব্যবহারের সুযোগের মাধ্যমে মায়েদের জীবনকে আরও নিরাপদ ও সহজ করা।
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="relative overflow-hidden rounded-2xl border border-purple-100 dark:border-purple-900/30 bg-background/50 backdrop-blur-sm p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all group hover:-translate-y-1"
          >
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                <feature.icon className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-xl sm:text-2xl">{feature.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
          </div>
        ))}
      </div>
    </section>
  )
}

