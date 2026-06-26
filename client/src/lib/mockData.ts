import { GENERATED_IMAGES } from "@/lib/siteAssets";
import { trekAssets } from "@/lib/trekAssets";

const heroImage = GENERATED_IMAGES.hero;
const northImage = GENERATED_IMAGES.north;
const southImage = GENERATED_IMAGES.south;
const eastImage = GENERATED_IMAGES.east;
const westImage = GENERATED_IMAGES.west;
const foreignImage = GENERATED_IMAGES.foreign;
const ladakhImage = GENERATED_IMAGES.ladakh;
const goaImage = GENERATED_IMAGES.goa;
const andamanImage = GENERATED_IMAGES.andaman;
const baliImage = GENERATED_IMAGES.bali;
const maldivesImage = GENERATED_IMAGES.maldives;
const vietnamImage = GENERATED_IMAGES.vietnam;

export interface Package {
  id: string;
  title: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Foreign' | 'Trekking';
  location: string;
  duration: string;
  /** Discounted/current price shown to users */
  price: number;
  /** Original price before discount (optional) */
  originalPrice?: number;
  image: string;
  gallery?: string[];
  /** Optional itinerary PDF for download in itinerary section */
  itineraryPdfUrl?: string;
  description: string;
  details?: { label: string; value: string }[];
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  whyChoose?: string[];
  isHot?: boolean;
  /** Discount percentage used for badges like “% OFF” (optional) */
  discount?: number;
}

export const regions = [
  {
    id: 'trekking',
    name: 'Trekking',
    image: heroImage,
    description: 'Alpine crossings, summit pushes, and offbeat trails for trekkers.',
  },
  {
    id: 'north',
    name: 'North India',
    image: northImage,
    description: 'Majestic Himalayas, spiritual retreats, and colonial hill stations.',
  },
  {
    id: 'south',
    name: 'South India',
    image: southImage,
    description: 'Tranquil backwaters, ancient temples, and lush greenery.',
  },
  {
    id: 'west',
    name: 'West India',
    image: westImage,
    description: 'Golden deserts, royal forts, and vibrant culture.',
  },
  {
    id: 'east',
    name: 'East India',
    image: eastImage,
    description: 'Mist-covered tea gardens, living root bridges, and biodiversity.',
  },
  {
    id: 'foreign',
    name: 'International',
    image: foreignImage,
    description: 'Explore the world beyond borders with our curated international tours.',
  },
];

const basePackages: Package[] = [
  {
    id: 'kedarkantha-trek',
    title: 'Kedarkantha Trek',
    region: 'Trekking',
    location: 'Sankri, Uttarakhand',
    duration: '4 Nights / 5 Days',
    originalPrice: 5500,
    price: 4900,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Classic winter summit climb to 12,500 ft with pine forests, alpine meadows, Juda Ka Talab campsite, and a 360° Garhwal panorama at sunrise.',
    details: [
      { label: 'Trek Name', value: 'Kedarkantha Trek' },
      { label: 'Duration', value: '4 Nights / 5 Days' },
      { label: 'Region', value: 'Uttarakhand, India' },
      { label: 'Base Camp', value: 'Sankri' },
      { label: 'Summit Altitude', value: '12,500 ft' },
      { label: 'Total Trek Distance', value: '≈20 km' },
      { label: 'Difficulty Level', value: 'Easy to Moderate' },
      { label: 'Trek Type', value: 'Peak trek with multiple scenic campsites' },
      { label: 'Best Season', value: 'November – April (ideal winter snow trek)' },
      { label: 'Pickup Point', value: 'Prince Chowk, Dehradun' },
      { label: 'Nearest Airport', value: 'Jolly Grant Airport (28 km from pickup point)' },
      { label: 'Stay', value: 'Homestay at Sankri + Twin-sharing tents on trek' },
      { label: 'Food', value: 'Nutritious vegetarian meals throughout the trek' },
      { label: 'Transport', value: 'Dehradun → Sankri → Dehradun (included)' },
      { label: 'Permits', value: 'All forest fees & entry charges included' },
      { label: 'Staff', value: 'Certified trek leader, guide, cook & support team' },
    ],
    highlights: [
      'Summit at 12,500 ft with 360° Himalayan views',
      'Iconic Juda Ka Talab forest campsite',
      'Beginner-friendly: easy to moderate winter trek',
      'Best season Nov–Apr for snow trails',
      'All permits, meals, transport Dehradun–Sankri included',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Dehradun → Sankri (6,400 ft)',
        description:
          'Your Kedarkantha adventure begins with a pickup from Prince Chowk, Dehradun, in the morning. The scenic 200 km drive (approximately 7–9 hours) takes you along the beautiful Yamuna and Tons rivers, winding through dense pine forests, deep mountain valleys, and quaint Uttarakhand villages. As you approach Sankri, the views of snow-capped Himalayan peaks begin to appear, building excitement for the trek ahead. Upon arrival in Sankri, you check into a cozy homestay or guesthouse where you meet your trek leader for a detailed briefing about the upcoming days. Enjoy a warm, nutritious dinner and rest well, as this night is essential for acclimatization and preparing your body for the alpine adventure starting tomorrow. The peaceful mountain village, surrounded by terraced fields and pine forests, offers the perfect environment to relax and mentally prepare for the journey.',
      },
      {
        day: 2,
        title: 'Sankri → Juda Ka Talab (9,100 ft) → Base Camp (11,250 ft)',
        description:
          'After a hearty breakfast, a short walk from Sankri leads you to the starting point of the trail. The trek begins through dense forests of pine, oak, and rhododendron, offering comforting shade and the fresh scent of mountain woods. The initial 5 km ascent (3–5 hours) brings you to the serene Juda Ka Talab, a high-altitude lake surrounded by trees and open meadows. This picturesque spot is perfect for a short break, where you can soak in the tranquility and capture beautiful photographs.\n\nAfter resting at Juda Ka Talab, the trail becomes steeper as you continue toward Kedarkantha Base Camp. This section (4–5 km, 4–5 hours) passes through alpine meadows and ridges offering wide mountain views. As you gain elevation, the tree line begins to thin, revealing expansive vistas of the surrounding Garhwal Himalayas. You reach base camp by afternoon, where your support team has already set up twin-sharing tents. Settle into your comfortable camping setup, enjoy hot snacks and tea, and spend a relaxing evening in the open Himalayan landscape. The campsite offers stunning sunset views and a peaceful atmosphere, making it an unforgettable first night in the mountains. All meals (Breakfast, Lunch, Snacks, Dinner) are included and prepared fresh by the trek cook.',
      },
      {
        day: 3,
        title: 'Acclimatization & Steeper Climbs around Base Camp',
        description:
          'This day is focused on higher climbs, acclimatization, and preparing for the summit push. The trail explores ridges and steeper slopes around the base camp area, helping your body adjust to the altitude gradually. As you move across open meadows and snow patches, the surrounding Himalayan peaks appear closer and clearer. This is also the day when the trek leader briefs you about the summit climb, conducts a gear check to ensure you have all necessary equipment, and discusses weather conditions and safety protocols.\n\nThe acclimatization walks help prevent altitude sickness and build confidence for the challenging summit day ahead. You learn about proper pacing, breathing techniques at high altitude, and what to expect during the early morning summit push. After the day\'s activities, you return to base camp for a warm, nutritious dinner. You rest early tonight, as the summit ascent will begin before dawn. The clear night sky at 11,250 ft offers incredible stargazing opportunities, and the peaceful mountain environment helps you relax and prepare mentally for the most rewarding day of the trek.',
      },
      {
        day: 4,
        title: 'Summit Day: Kedarkantha (12,500 ft) → Hargaon / Juda Ka Talab',
        description:
          'Your summit push begins under the early-morning starry sky, around 2:00 AM. After a quick pre-dawn tea and light snacks, you start the climb to Kedarkantha Peak. The trail involves ascending through snow trails, meadows, and a final steep ridge. The climb is challenging but extremely rewarding, as you witness the gradual transition from darkness to the first light of dawn.\n\nReaching the summit at sunrise is the highlight of the entire trek—you witness a spectacular 360° panorama of the Garhwal Himalayas, including Swargarohini, Black Peak, Bandarpoonch, and numerous other peaks stretching across the horizon. The feeling of accomplishment and the breathtaking views make every step worth it. After spending quality time at the top, taking photographs, and absorbing the incredible scenery, you begin your careful descent back to base camp.\n\nUpon returning to base camp, you enjoy a warm, hearty breakfast prepared by the team. Following a brief rest, you continue your descent further down to Hargaon or Juda Ka Talab for the night. The downhill walk is pleasant and scenic, allowing you to reflect on the incredible summit experience. This is the most rewarding and memorable day of the trek, filled with challenges, achievements, and unforgettable mountain vistas. All meals (Pre-dawn tea/snacks, Breakfast, Lunch, Dinner) are included.',
      },
      {
        day: 5,
        title: 'Juda Ka Talab → Sankri → Dehradun (Trek Ends)',
        description:
          'After breakfast, you begin the short and scenic descent from Juda Ka Talab to Sankri. The downhill trail (approximately 4 km, 1.5–2 hours) passes through forests and open clearings, making it a calm and refreshing walk. The gentle descent allows you to enjoy the beautiful mountain scenery one last time and reflect on the incredible journey you\'ve completed.\n\nOnce you reach Sankri, you board the vehicle for the long but beautiful drive back to Dehradun. The 200 km journey (8–10 hours) retraces the scenic mountain roads and river valleys, giving you one last chance to enjoy the beauty of the Garhwal Himalayas. You arrive in Dehradun by evening (around 5–6 PM), where the trek officially concludes.\n\nWith memories of frozen lakes, forest trails, snow-covered peaks, and the spectacular Kedarkantha summit, the trek leaves you with a deep appreciation for the Himalayas and an unforgettable winter adventure experience. The journey not only challenges you physically but also provides moments of peace, reflection, and connection with nature that will stay with you forever.',
      },
    ],
    whyChoose: [
      'Perfect for beginners: The Kedarkantha Trek is one of the most beginner-friendly winter treks in the Himalayas, with a moderate difficulty level that makes it accessible to first-time trekkers while still offering a challenging and rewarding experience.',
      'Iconic summit views: Standing at 12,500 ft, the Kedarkantha summit offers one of the most spectacular 360° panoramas in the Garhwal Himalayas, including views of Swargarohini, Black Peak, and Bandarpoonch peaks.',
      'Beautiful campsites: The trek features some of the most scenic campsites in the region, including the iconic Juda Ka Talab, where you camp beside a high-altitude lake surrounded by pine forests and meadows.',
      'Winter wonderland experience: Trekking during November to April means you\'ll experience thick snow, frozen lakes, and pristine winter landscapes that transform the entire region into a magical white wonderland.',
      'Well-organized logistics: All permits, meals, transport from Dehradun, accommodation, and expert guidance are included, ensuring a hassle-free and safe trekking experience from start to finish.',
      'Cultural immersion: The journey takes you through traditional Uttarakhand villages, allowing you to experience local culture, cuisine, and the warm hospitality of mountain communities.',
    ],
    isHot: true,
    discount: 11,
  },
  {
    id: 'dayara-bugyal',
    title: 'Dayara Bugyal Trek',
    region: 'Trekking',
    location: 'Raithal, Uttarakhand',
    duration: '4 Days / 3 Nights',
    originalPrice: 5500,
    price: 4900,
    image: 'https://images.unsplash.com/photo-1500534312202-102d20867b1e?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500534312202-102d20867b1e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'High-altitude meadow trek to Dayara Top with sweeping Himalayan vistas, forest approaches, and serene camps at Raithal/Gui.',
    details: [
      { label: 'Trek Name', value: 'Dayara Bugyal Trek' },
      { label: 'Duration', value: '4 Days / 3 Nights' },
      { label: 'Region', value: 'Uttarakhand, India' },
      { label: 'Base Camp', value: 'Raithal' },
      { label: 'Highest Point', value: 'Dayara Top (12,300 ft)' },
      { label: 'Total Trek Distance', value: '≈18–20 km' },
      { label: 'Difficulty Level', value: 'Easy to Moderate' },
      { label: 'Trek Type', value: 'Meadow trek with forest trails and ridge views' },
      { label: 'Best Season', value: 'Nov–Mar (snow), Apr–Jun (spring meadows)' },
      { label: 'Pickup Point', value: 'Rishikesh' },
      { label: 'Nearest Airport', value: 'Jolly Grant Airport (25 km from Rishikesh)' },
      { label: 'Stay', value: 'Homestay in Raithal + twin-sharing tents on trek' },
      { label: 'Food', value: 'Nutritious vegetarian meals during the trek' },
      { label: 'Transport', value: 'Rishikesh → Raithal → Rishikesh' },
      { label: 'Permits', value: 'All entry fees included' },
      { label: 'Staff', value: 'Certified trek leader, guide, cook & support staff' },
    ],
    highlights: [
      'Vast alpine meadows of Dayara with Himalayan panoramas (Bandarpunch, Gangotri range)',
      'Easy-moderate gradients, great for beginners and families',
      'Mixed forest approach through oak and rhododendron',
      'Snow walks in winter; wildflowers and lush meadows in spring',
      'Short 4-day format with comfortable camps at Gui and Raithal',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Rishikesh → Raithal (7,400 ft)',
        description:
          'Your Dayara Bugyal adventure begins with an early morning departure from Rishikesh. The scenic 180 km drive (approximately 7–8 hours) follows the beautiful Bhagirathi River, passing through the historic towns of Uttarkashi and Bhatwari. As the landscape transitions into dense cedar forests and lush valleys, the cool mountain air sets the perfect tone for the days ahead.\n\nUpon reaching Raithal, you settle into a cozy homestay in this quaint mountain village. The peaceful village, surrounded by terraced fields and pine forests, offers a perfect acclimatization environment before the trek begins. You meet your trek leader for a detailed briefing about the upcoming trek, learn about the route, safety protocols, and what to expect. Enjoy a warm, traditional dinner prepared by your hosts and rest well, as tomorrow marks the beginning of your journey into the alpine meadows.',
      },
      {
        day: 2,
        title: 'Raithal → Gui Campsite (9,500 ft)',
        description:
          'After a hearty breakfast, the trek begins with a gentle ascent through dense oak and rhododendron forests. The well-marked trail gradually opens up to reveal stunning views of Bandarpunch and the upper Garhwal Himalayas. The sound of birds and the fresh mountain air create a calming and invigorating start to your trek.\n\nThe trail (approximately 4–5 km, 3–4 hours) takes you from 7,400 ft to 9,500 ft, with a moderate gradient that allows you to enjoy the natural beauty at a comfortable pace. As you climb higher, the forest gives way to small clearings and meadows, leading you to the scenic Gui campsite. Situated amidst towering oak trees and surrounded by sweeping mountain views, Gui offers a calm and refreshing atmosphere.\n\nBy afternoon, you settle into your twin-sharing tents, which have been set up by the support team. The evening brings a warm dinner prepared fresh by the trek cook, featuring nutritious vegetarian meals. You rest early tonight, preparing for the highlight of the trek tomorrow—the climb to Dayara Bugyal. The peaceful forest environment and the sound of nature create the perfect setting for a restful night.',
      },
      {
        day: 3,
        title: 'Gui → Dayara Bugyal (12,300 ft) → return to Gui',
        description:
          'Today is the highlight of the trek. You begin with a steady ascent through open meadows, and as the tree line drops away, the vast expanse of Dayara Bugyal unfolds before you. Stretching over several kilometers, this high-altitude meadow feels like walking on a natural carpet with Himalayan peaks lining the horizon.\n\nThe climb (approximately 6–7 km, 4–6 hours round trip) takes you from 9,500 ft to 12,300 ft, where you are rewarded with sweeping views of Srikanth, Jaonli, the Gangotri range, and Bandarpunch. The meadow itself is a stunning natural wonder, especially during spring when it\'s carpeted with wildflowers, or in winter when it\'s covered in pristine snow.\n\nAfter spending quality time soaking in the vistas, taking photographs, and simply absorbing the incredible beauty of the place, you begin your descent back to Gui. The return journey is equally scenic, allowing you to enjoy the golden hues of the late afternoon light. Another warm dinner and peaceful night in your tents await, with the satisfaction of having reached one of the most beautiful high-altitude meadows in the Himalayas.',
      },
      {
        day: 4,
        title: 'Gui → Raithal → Rishikesh (Trek Ends)',
        description:
          'After breakfast, you begin your descent from Gui to Raithal via the same forest trail. The downhill walk (approximately 4–5 km, 2–3 hours) is gentle and refreshing, with pleasant views of terraced villages and forest-covered slopes. The descent is much easier than the ascent, allowing you to enjoy the scenery and reflect on the incredible journey you\'ve completed.\n\nUpon reaching Raithal, you board the vehicle for your return journey to Rishikesh. The drive offers one last look at the tranquil Bhagirathi valley before concluding your trek in the evening. The 180 km journey (7–8 hours) gives you time to process the beautiful memories you\'ve created.\n\nYou arrive in Rishikesh by evening, where the trek officially concludes. With stunning meadow views, peaceful forest camps, and the unforgettable experience of Dayara Bugyal, the trek leaves you with memories of wide open landscapes and Himalayan tranquility that will stay with you forever.',
      },
    ],
    whyChoose: [
      'Stunning high-altitude meadows: Dayara Bugyal is one of the most beautiful and expansive high-altitude meadows in Uttarakhand, offering a unique trekking experience that combines forest trails with vast open grasslands.',
      'Perfect for all seasons: Whether you visit in winter for snow-covered landscapes or in spring for wildflower meadows, Dayara Bugyal offers breathtaking beauty throughout the trekking season.',
      'Beginner-friendly: With an easy to moderate difficulty level and manageable distances, this trek is perfect for first-time trekkers and families looking for a Himalayan adventure.',
      'Spectacular mountain views: From the meadow, you get panoramic views of some of the most iconic peaks in the Garhwal Himalayas, including Srikanth, Jaonli, Gangotri range, and Bandarpunch.',
      'Cultural experience: The trek takes you through traditional mountain villages, allowing you to experience local culture and the warm hospitality of the Garhwal region.',
      'Well-organized and safe: All logistics including permits, meals, accommodation, and expert guidance are included, ensuring a safe and hassle-free trekking experience.',
    ],
    discount: 11,
  },
  {
    id: 'chandrakhani-pass',
    title: 'Chandrakhani Pass – Malana Circuit Trek',
    region: 'Trekking',
    location: 'Manali, Himachal Pradesh',
    duration: '3 Nights / 4 Days',
    originalPrice: 9500,
    price: 8200,
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Forest-to-ridge circuit over Chandrakhani Pass with panoramic Pir Panjal and Parvati views, finishing with a cultural descent toward Malana.',
    details: [
      { label: 'Trek Name', value: 'Chandrakhani Pass – Malana Circuit Trek' },
      { label: 'Duration', value: '3 Nights / 4 Days' },
      { label: 'Region', value: 'Himachal Pradesh, India' },
      { label: 'Base / Start Point', value: 'Manali' },
      { label: 'Highest Altitude', value: '~12,030 ft (Chandrakhani / Chaklani Pass Ridge)' },
      { label: 'Total Trek Distance', value: '≈26–28 km' },
      { label: 'Difficulty Level', value: 'Easy to Moderate' },
      { label: 'Trek Type', value: 'Forest trails, ridge walk, high pass crossing & cultural descent' },
      { label: 'Best Season', value: 'April–June & September–November' },
      { label: 'Pickup Point', value: 'Manali' },
      { label: 'Nearest Airport', value: 'Bhuntar Airport (48 km from Manali)' },
      { label: 'Stay', value: 'Camping (twin-sharing tents) + homestay near Malana' },
      { label: 'Food', value: 'Veg meals from Day 1 lunch to Day 4 breakfast' },
      { label: 'Transport', value: 'Manali → Rumsu → Malana Roadhead → Manali' },
      { label: 'Permits', value: 'All entry and forest permissions included' },
      { label: 'Team', value: 'Trek leader, guide, cook & support staff' },
    ],
    highlights: [
      'Panoramic Pir Panjal, Parvati, and Dhauladhar views from Chandrakhani ridge',
      'Forest-to-meadow transition with long ridge walks',
      'Cultural descent toward the Malana region',
      'Compact 4-day circuit with balanced distances',
      'All permits, meals, and logistics from Manali included',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Manali → Rumsu → Ghohan Krari (9,000 ft)',
        description:
          'Your Chandrakhani Pass adventure begins with a scenic drive from Manali to Rumsu, a charming Himachali village and the starting point of the trek. The drive (approximately 1–1.5 hours) takes you through beautiful mountain roads, offering glimpses of the Kullu valley and surrounding peaks.\n\nAfter lunch and a brief introduction to the trek, the trail starts through thick pine and deodar forests. The trail gradually ascends, offering comforting shade and occasional clearings that reveal stunning views of the Kullu valley. The initial 5–6 km trek (4–5 hours) takes you from 6,700 ft to 9,000 ft, allowing your body to acclimatize gradually.\n\nAs you gain height, the forest opens into ridgelines leading toward the Ghohan Krari campsite. Situated on an elevated meadow, this campsite offers beautiful sunset views and a peaceful atmosphere for your first night in the mountains. The support team sets up twin-sharing tents, and you enjoy a warm dinner prepared fresh by the trek cook. The evening is perfect for stargazing and getting to know your fellow trekkers.',
      },
      {
        day: 2,
        title: 'Ghohan Krari → Chaklani (12,000 ft)',
        description:
          'Today you trek deeper into the alpine zone as the trail climbs steadily through a mix of forest and open meadows. The higher you move, the clearer the mountain views become, with peaks like Deo Tibba and Indrasan dominating the horizon. The trek (approximately 12–14 km, 6–9 hours) takes you from 9,000 ft to 12,000 ft, requiring good pacing and determination.\n\nThe trail transitions from dense forests to open alpine meadows, offering increasingly spectacular vistas. The final stretch toward Chaklani is along a ridge that opens into wide, panoramic views of the surrounding Himalayan ranges. The campsite at Chaklani sits on an exposed high ridge, known for crisp winds, brilliant sunsets, and starry night skies.\n\nThis is your acclimatization and summit-base night before crossing the pass. The trek leader briefs you about the next day\'s challenging pass crossing, and you prepare mentally and physically for the highlight of the trek. After a warm dinner, you rest early, as tomorrow requires an early start for the pass crossing.',
      },
      {
        day: 3,
        title: 'Chaklani → Chandrakhani Pass (12,030 ft) → Malana',
        description:
          'The summit push begins early as you climb toward Chandrakhani Pass along rocky ridgelines that offer spectacular Himalayan views. The trail (approximately 11–14 km, 7–9 hours) is challenging but incredibly rewarding, taking you from 12,000 ft to the pass at 12,030 ft, then descending to approximately 10,440 ft on the Malana side.\n\nUpon reaching the pass, you are rewarded with a sweeping panorama of the Pir Panjal, Parvati Valley, and Dhauladhar ranges. The 360-degree views from the pass are truly breathtaking, making all the effort worthwhile. After spending time absorbing the views, taking photographs, and celebrating this achievement, you begin your gradual descent toward the Malana side.\n\nThe landscape transitions from high meadows to dense forest and then to the culturally distinct region surrounding Malana. You stay in a homestay or designated campsite near the village, respecting the traditional customs of the area. The descent offers different perspectives of the mountains and allows you to experience the unique culture of the Malana region. This day combines physical challenge with cultural immersion, making it one of the most memorable days of the trek.',
      },
      {
        day: 4,
        title: 'Malana → Roadhead → Manali (Trek Ends)',
        description:
          'After breakfast, you descend from the campsite to the Malana roadhead. The trail (approximately 3–4 km, 1.5–2 hours) is short and scenic, offering beautiful morning views of the valley. The gentle descent allows you to reflect on the incredible journey you\'ve completed and enjoy the final moments in the mountains.\n\nVehicles will be waiting at the roadhead to take you back to Manali. The drive winds through the lush Parvati Valley before rejoining the main Kullu–Manali route. The journey offers one last opportunity to enjoy the beautiful mountain scenery and process the unforgettable experiences of the past few days.\n\nUpon arrival in Manali, the trek officially concludes, leaving you with unforgettable memories of forest trails, high ridges, a dramatic pass crossing, and the unique heritage of Malana. The combination of natural beauty, physical challenge, and cultural discovery makes this trek a truly enriching experience.',
      },
    ],
    whyChoose: [
      'Spectacular pass crossing: Chandrakhani Pass offers one of the most dramatic and rewarding pass crossings in Himachal Pradesh, with panoramic views of multiple Himalayan ranges including Pir Panjal, Parvati Valley, and Dhauladhar.',
      'Cultural immersion: The trek concludes near the unique Malana village, known for its distinct culture and traditions, providing a rare opportunity to experience a different way of life in the Himalayas.',
      'Forest to ridge transition: Experience the beautiful transition from dense pine and deodar forests to open alpine meadows and high ridges, offering diverse landscapes throughout the trek.',
      'Perfect for intermediate trekkers: With moderate difficulty and well-balanced distances, this trek is ideal for those who have some trekking experience and are ready for a challenging but achievable adventure.',
      'Stunning campsites: The campsites at Ghohan Krari and Chaklani offer some of the most beautiful locations in the region, with incredible sunset views and starry night skies.',
      'All-inclusive logistics: From Manali pickup to meals, permits, accommodation, and expert guidance, everything is organized for a seamless and safe trekking experience.',
    ],
    discount: 14,
  },
  {
    id: 'kuari-pass',
    title: 'Kuari Pass Trek',
    region: 'Trekking',
    location: 'Joshimath, Uttarakhand',
    duration: '4 Nights / 5 Days',
    originalPrice: 9000,
    price: 7900,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500534312202-102d20867b1e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Classic Himalayan pass trek with snow meadows, ridge walks, and commanding views of Nanda Devi, Dronagiri, Hathi-Ghoda, Kamet, and Chaukhamba.',
    details: [
      { label: 'Trek Name', value: 'Kuari Pass Trek' },
      { label: 'Duration', value: '4 Nights / 5 Days' },
      { label: 'Region', value: 'Uttarakhand, India' },
      { label: 'Base Camp', value: 'Joshimath' },
      { label: 'Highest Altitude', value: '~12,516 ft (Kuari Pass)' },
      { label: 'Total Trek Distance', value: '≈22–25 km' },
      { label: 'Difficulty Level', value: 'Easy to Moderate' },
      { label: 'Trek Type', value: 'Classic Himalayan pass, meadows & ridge walk' },
      { label: 'Best Season', value: 'Nov–Mar (winter snow) / Apr–Jun (spring)' },
      { label: 'Pickup Point', value: 'Rishikesh' },
      { label: 'Nearest Airport', value: 'Jolly Grant Airport (20 km from pickup point)' },
      { label: 'Stay', value: 'Homestay in Joshimath + twin-sharing tents on trek' },
      { label: 'Food', value: 'Nutritious vegetarian meals throughout the trek' },
      { label: 'Transport', value: 'Rishikesh → Joshimath → Rishikesh' },
      { label: 'Permits', value: 'All forest entry & trekking fees included' },
      { label: 'Staff', value: 'Certified trek leader, guide, cook & support team' },
    ],
    highlights: [
      'Iconic Kuari Pass ridge views of Nanda Devi, Dronagiri, Hathi-Ghoda, Kamet, Chaukhamba',
      'Snow meadows and oak–rhododendron forests',
      'Balanced distances over 5 days, beginner-friendly',
      'Scenic drive via confluences Devprayag, Rudraprayag, Karnaprayag',
      'All permits, meals, and logistics from Rishikesh included',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Rishikesh → Joshimath (6,725 ft)',
        description:
          'Your Kuari Pass adventure begins with a scenic mountain drive from Rishikesh. The route follows the Ganga and Alaknanda rivers, passing through Devprayag, Rudraprayag, and Karnaprayag—three of Uttarakhand\'s most significant river confluences. Each confluence offers a unique natural spectacle, where different rivers merge to create powerful flows.\n\nWith snow-covered mountains coming into view in the later half of the journey, the excitement builds as you approach Joshimath, the gateway to several major Himalayan expeditions. The 250 km drive (approximately 8–10 hours) takes you through beautiful valleys, mountain towns, and scenic viewpoints. Upon arrival, you check into a comfortable homestay, freshen up, and enjoy a warm dinner while the trek leader briefs you about the upcoming trek days. Joshimath serves as an important pilgrimage center and offers a perfect base for acclimatization before heading into the higher altitudes.',
      },
      {
        day: 2,
        title: 'Joshimath → Dhak → Gulling Top (9,650 ft)',
        description:
          'After breakfast, a short 12 km drive brings you to the village of Dhak, where the trail begins. The trek starts with a gradual ascent through traditional Himalayan villages and terraced fields, offering glimpses into the local way of life. As you climb higher, the views open up toward the slopes of Dronagiri and other prominent peaks.\n\nThe well-defined trail (approximately 5 km, 3–4 hours) continues through oak and rhododendron forests before reaching the open clearings of Gulling Top. The forest sections provide shade and a cool environment, while the clearings offer stunning mountain vistas. Surrounded by forested ridges and wide mountain views, the campsite offers a peaceful evening with warm meals and fresh mountain air.\n\nYou settle into your twin-sharing tents, enjoy hot snacks and tea, and spend the evening acclimatizing to the altitude. The campsite location provides beautiful sunset views and a perfect introduction to camping in the Himalayas. The support team ensures all your needs are met, from comfortable sleeping arrangements to nutritious meals.',
      },
      {
        day: 3,
        title: 'Gulling Top → Khulara Campsite (11,000 ft)',
        description:
          'Today\'s trail takes you deeper into the alpine forests as the terrain gradually becomes more open and expansive. The trek (approximately 6 km, 4–5 hours) from 9,650 ft to 11,000 ft is moderate but requires steady pacing. As you approach higher altitudes, the tree line begins to thin, revealing wide meadows and dramatic views of Dronagiri, Kamet, Chaukhamba, and Hathi–Ghoda peaks.\n\nThe campsite at Khulara is set in a vast meadow surrounded by towering ridges. It is the perfect place to prepare for the next morning\'s summit push. The location offers expansive views in all directions, making it one of the most scenic campsites of the trek. After settling into your tents and enjoying a hot meal, you relax under the stunning night sky before an early rest.\n\nThe trek leader briefs you about the summit day, discussing the route, expected weather conditions, and what to expect during the pass crossing. This preparation is crucial for a successful and safe summit experience. The evening is perfect for stargazing, as the high altitude and clear skies offer incredible views of the Milky Way.',
      },
      {
        day: 4,
        title: 'Khulara → Kuari Pass (12,516 ft) → return to Khulara → Joshimath',
        description:
          'An early morning start leads you through open snow-covered meadows toward the Kuari Pass ridge. The trail gradually climbs until you reach the iconic pass at 12,516 ft. The trek (approximately 10–12 km, 6–8 hours round trip) is challenging but incredibly rewarding, taking you through diverse terrain from meadows to snow-covered slopes.\n\nFrom the pass, you are rewarded with one of the most spectacular Himalayan panoramas—views of Nanda Devi, Dronagiri, Hathi-Ghoda, Kamet, Chaukhamba, and several other 7000m and 6000m peaks. The 360-degree view from Kuari Pass is truly breathtaking and makes all the effort worthwhile. After taking photographs, enjoying the views, and celebrating this achievement, you begin your descent back to Khulara.\n\nFollowing a brief rest at camp, you continue your downhill walk to Dhak and drive back to Joshimath for a comfortable stay and a warm dinner after a rewarding summit day. The descent is pleasant and allows you to reflect on the incredible experience of crossing one of the most famous passes in the Garhwal Himalayas. The sense of accomplishment and the memories of the stunning views will stay with you forever.',
      },
      {
        day: 5,
        title: 'Joshimath → Rishikesh (Trek Ends)',
        description:
          'After breakfast, you begin the drive back from Joshimath to Rishikesh, retracing the scenic mountain route along the Alaknanda valley. The journey (approximately 250 km, 8–10 hours) offers beautiful views one last time before you descend into the foothills. The drive takes you past the same river confluences, but now with a deeper appreciation for the natural beauty of the region.\n\nBy evening, you reach Rishikesh, where the trek officially concludes. With memories of snow-covered meadows, spectacular ridge walks, and the grandeur of Nanda Devi and Dronagiri, the Kuari Pass Trek leaves you with a deep appreciation for the Himalayas. The combination of natural beauty, physical challenge, and cultural discovery makes this trek a truly enriching experience that will inspire you to explore more of the mountains.',
      },
    ],
    whyChoose: [
      'Iconic Himalayan pass: Kuari Pass is one of the most famous and accessible passes in the Garhwal Himalayas, offering spectacular views of some of the highest peaks in India, including Nanda Devi (7,816m).',
      'Spectacular peak views: From the pass, you get panoramic views of multiple 7000m+ peaks including Nanda Devi, Dronagiri, Kamet, Chaukhamba, and Hathi-Ghoda, making it a photographer\'s paradise.',
      'Perfect for all seasons: Whether you visit in winter for snow-covered landscapes or in spring for blooming meadows, Kuari Pass offers breathtaking beauty throughout the trekking season.',
      'Well-balanced itinerary: The 5-day format allows for proper acclimatization, manageable daily distances, and enough time to enjoy the stunning scenery without feeling rushed.',
      'Cultural experience: The journey takes you through traditional Garhwal villages and past important pilgrimage sites, offering insights into the local culture and way of life.',
      'All-inclusive package: From Rishikesh pickup to meals, permits, accommodation, and expert guidance, everything is organized for a seamless and safe trekking experience.',
    ],
    discount: 12,
  },
  {
    id: 'pangarchulla-kuari-pass',
    title: 'Pangarchulla Peak + Kuari Pass Trek',
    region: 'Trekking',
    location: 'Joshimath, Uttarakhand',
    duration: '6 Nights / 7 Days',
    originalPrice: 10500,
    price: 8900,
    image: 'https://images.unsplash.com/photo-1500534312202-102d20867b1e?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500534312202-102d20867b1e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Dual objective trek combining Kuari Pass ridge panoramas with a high-altitude summit push to Pangarchulla (15,069 ft) across snow slopes and alpine meadows.',
    details: [
      { label: 'Trek Name', value: 'Pangarchulla Peak + Kuari Pass Trek' },
      { label: 'Duration', value: '6 Nights / 7 Days' },
      { label: 'Region', value: 'Uttarakhand, India' },
      { label: 'Base Camp', value: 'Joshimath' },
      { label: 'Highest Altitude', value: '~15,069 ft (Pangarchulla Summit)' },
      { label: 'Total Trek Distance', value: '≈35–38 km' },
      { label: 'Difficulty Level', value: 'Moderate to Difficult' },
      { label: 'Trek Type', value: 'Snow climb, ridge walk, alpine meadows & high-altitude summit' },
      { label: 'Best Season', value: 'Apr–Jun & Oct–Nov' },
      { label: 'Pickup Point', value: 'Rishikesh' },
      { label: 'Nearest Airport', value: 'Jolly Grant Airport (20 km from pickup point)' },
      { label: 'Stay', value: 'Homestay in Joshimath + twin-sharing tents during trek' },
      { label: 'Food', value: 'Nutritious vegetarian meals throughout' },
      { label: 'Transport', value: 'Rishikesh → Joshimath → Rishikesh' },
      { label: 'Permits', value: 'All trekking & forest entry fees included' },
      { label: 'Staff', value: 'Certified leader, technical guide, cook & support team' },
    ],
    highlights: [
      'Summit Pangarchulla (15,069 ft) with expansive 6000–7000m peak views',
      'Kuari Pass ridge panorama of Nanda Devi, Dronagiri, Chaukhamba, Kamet, Hathi–Ghoda',
      'Snow climbs, long ridges, and alpine meadows in one circuit',
      'Balanced acclimatization with dual objectives over 7 days',
      'All permits, meals, transport from Rishikesh, and technical guidance included',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Rishikesh → Joshimath (6,725 ft)',
        description:
          'Your dual-objective adventure begins with a scenic drive through the Garhwal Himalayas, passing Devprayag, Rudraprayag, and Karnaprayag—Uttarakhand\'s prominent river confluences. As you approach Joshimath, the mountains tower above the valley, building excitement for the challenging trek ahead. The 250 km drive (approximately 8–10 hours) takes you through beautiful valleys and mountain towns.\n\nAfter checking into your homestay, you meet the trek leader for a detailed briefing and comprehensive gear check. This is crucial for the dual objectives ahead—crossing Kuari Pass and summiting Pangarchulla Peak. The team ensures you have all necessary equipment for snow climbs and high-altitude trekking. A warm dinner and a comfortable night\'s rest prepare you for the adventure starting tomorrow.',
      },
      {
        day: 2,
        title: 'Joshimath → Tugasi → Gulling Top (9,650 ft)',
        description:
          'After breakfast, a short 12 km drive takes you to Tugasi village, the starting point of the trek. The trail ascends gradually through terraced farms and traditional Himalayan homes, offering glimpses into local mountain life. As you climb, you enter oak and rhododendron forests that offer refreshing shade and glimpses of the Dronagiri range.\n\nThe trek (approximately 5 km, 3–4 hours) from 6,725 ft to 9,650 ft is moderate and allows for proper acclimatization. The forest sections provide a cool environment, while the clearings offer stunning mountain vistas. By afternoon, you reach the peaceful campsite at Gulling Top, surrounded by dense forests and ridge views. Settle into your tents, enjoy hot snacks, and unwind in the calm mountain environment. The evening is perfect for preparing mentally and physically for the challenging days ahead.',
      },
      {
        day: 3,
        title: 'Gulling Top → Khulara Campsite (11,000 ft)',
        description:
          'The trail today gradually ascends through oak forests before opening into wide alpine meadows. The trek (approximately 6 km, 4–5 hours) from 9,650 ft to 11,000 ft is steady and allows you to enjoy the changing landscape. As you approach higher terrain, the tree line recedes and vast views of the Garhwal Himalayas unfold—Dronagiri, Hathi–Ghoda, Kamet, and other peaks dominate the skyline.\n\nThe Khulara campsite, located in a large meadow, offers expansive views and a quiet evening. This is your base for both the Kuari Pass crossing and the Pangarchulla summit attempt. You settle into your tents, enjoy a warm dinner, and rest early in preparation for the Kuari Pass climb tomorrow. The location provides incredible sunset views and is perfect for stargazing, with the high altitude offering clear views of the night sky.',
      },
      {
        day: 4,
        title: 'Khulara → Kuari Pass (12,516 ft) → return to Khulara',
        description:
          'The day begins with a steady climb through expansive meadows leading toward the Kuari Pass ridge. The trek (approximately 10 km, 6–7 hours round trip) takes you from 11,000 ft to 12,516 ft and back. As you gain height, the views become increasingly spectacular, with snow-covered peaks coming into view.\n\nReaching Kuari Pass rewards you with a magnificent Himalayan panorama—Nanda Devi, Dronagiri, Chaukhamba, Kamet, and several towering peaks form a breathtaking 360° view. This is your first major objective, and the sense of accomplishment is incredible. After spending time at the pass, taking photographs, and absorbing the scenery, you descend back to Khulara. The return journey is calm and scenic, allowing you to relax at the campsite after a fulfilling pass crossing. This day serves as excellent preparation and acclimatization for the more challenging Pangarchulla summit attempt tomorrow.',
      },
      {
        day: 5,
        title: 'Summit Day: Pangarchulla (15,069 ft) → return to Khulara',
        description:
          'Your summit attempt begins before dawn, around 3:00 AM, as you climb under the stars. The trail starts with a gradual snow-covered ascent that soon turns into steep ridges and long snow slopes. The trek (approximately 10–12 km, 10–12 hours round trip) is the most challenging day, taking you from 11,000 ft to 15,069 ft and back.\n\nThe final push to the Pangarchulla summit is challenging but extremely rewarding. Standing at 15,069 ft, you witness one of the finest Himalayan panoramas—Nanda Devi, Hathi–Ghoda, Dronagiri, Chaukhamba, and multiple 6000m–7000m peaks stretch across the horizon. The technical sections require careful navigation, and the support team provides guidance throughout. After enjoying this incredible moment and celebrating your achievement, you carefully descend and return to Khulara by late afternoon for a warm meal and well-earned rest. This is the most challenging and rewarding day of the entire trek.',
      },
      {
        day: 6,
        title: 'Khulara → Tugasi → drive to Joshimath',
        description:
          'After breakfast, you begin the descent from Khulara to Tugasi. The downhill route (approximately 6 km, 2–3 hours) is pleasant, passing through forests and open slopes with beautiful valley views. The descent is much easier than the ascent, allowing you to enjoy the scenery and reflect on the incredible achievements of the past days.\n\nUpon reaching Tugasi, your vehicle takes you back to Joshimath. The remainder of the day is spent relaxing, refreshing, and celebrating the completion of two major Himalayan achievements—Kuari Pass and Pangarchulla Peak. The sense of accomplishment is immense, having successfully completed both objectives. You enjoy a comfortable stay in the homestay and a celebratory dinner, sharing stories and memories with your fellow trekkers.',
      },
      {
        day: 7,
        title: 'Joshimath → Rishikesh (Trek Ends)',
        description:
          'You begin the return journey after breakfast, retracing the scenic mountain roads along the Alaknanda valley. The drive (approximately 250 km, 8–10 hours) takes you past the same river confluences, but now with a deeper appreciation for the natural beauty and the incredible journey you\'ve completed.\n\nAs you descend into the plains, the Himalayas slowly fade behind you, leaving you with unforgettable memories of challenging summits, snow climbs, and breathtaking Himalayan panoramas. You reach Rishikesh by evening, marking the official end of this exhilarating expedition. The combination of natural beauty, physical challenge, and the achievement of dual objectives makes this trek a truly transformative experience that will inspire you to explore more of the mountains.',
      },
    ],
    whyChoose: [
      'Dual objectives in one trek: Experience both the iconic Kuari Pass crossing and the challenging Pangarchulla Peak summit in a single expedition, maximizing your Himalayan adventure.',
      'High-altitude summit achievement: Standing at 15,069 ft, Pangarchulla offers one of the most rewarding summit experiences in the Garhwal Himalayas, with panoramic views of multiple 7000m peaks.',
      'Technical challenge: This trek is perfect for experienced trekkers looking for a challenging adventure that combines pass crossing with high-altitude peak climbing.',
      'Spectacular peak views: From both Kuari Pass and Pangarchulla summit, you get breathtaking views of Nanda Devi, Dronagiri, Chaukhamba, Kamet, and other iconic Himalayan peaks.',
      'Well-planned acclimatization: The 7-day format allows for proper acclimatization, ensuring you\'re well-prepared for both the pass crossing and the summit attempt.',
      'Expert guidance: With certified leaders and technical guides, you receive professional support throughout the challenging sections, ensuring safety and success.',
    ],
    discount: 15,
  },
  {
    id: 'brahmatal-trek',
    title: 'Brahmatal Trek',
    region: 'Trekking',
    location: 'Lohajung, Uttarakhand',
    duration: '4 Nights / 5 Days',
    originalPrice: 8000,
    price: 5900,
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500534312202-102d20867b1e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Winter classic featuring frozen lakes, forest approaches, ridge walks, and a 12,250 ft summit with sweeping Garhwal views.',
    details: [
      { label: 'Trek Name', value: 'Brahmatal Trek' },
      { label: 'Duration', value: '4 Nights / 5 Days' },
      { label: 'Region', value: 'Uttarakhand, India' },
      { label: 'Base Camp', value: 'Lohajung' },
      { label: 'Summit Altitude', value: '12,250 ft (Brahmatal Summit)' },
      { label: 'Total Trek Distance', value: '≈24–26 km' },
      { label: 'Difficulty Level', value: 'Easy to Moderate' },
      { label: 'Trek Type', value: 'Forest trails, frozen lakes, ridge walks & summit climb' },
      { label: 'Best Season', value: 'December–March (ideal for snow)' },
      { label: 'Pickup Point', value: 'Rishikesh' },
      { label: 'Nearest Airport', value: 'Jolly Grant Airport (20 km from pickup point)' },
      { label: 'Stay', value: 'Homestay in Lohajung + twin-sharing tents on trek' },
      { label: 'Food', value: 'Nutritious vegetarian meals throughout the trek' },
      { label: 'Transport', value: 'Rishikesh → Lohajung → Rishikesh' },
      { label: 'Permits', value: 'All forest entry & trekking fees included' },
      { label: 'Staff', value: 'Certified trek leader, guide, cook & support staff' },
    ],
    highlights: [
      'Frozen Bekaltal/Brahmatal lakes and snow meadows in winter',
      'Summit views of Trishul, Nanda Ghunti, Chaukhamba, Nilkanth',
      'Forest-to-ridge progression with scenic camps',
      'Beginner-friendly distances over 5 days',
      'All permits, meals, and logistics from Rishikesh included',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Rishikesh → Lohajung (7,600 ft)',
        description:
          'Your Brahmatal adventure begins with an early morning departure from Rishikesh, following the scenic river valleys of the Ganga and Alaknanda. As you travel through Devprayag, Rudraprayag, and Karnaprayag, you witness the confluence of major Himalayan rivers and the changing landscape of Uttarakhand. The 250 km drive (approximately 9–10 hours) takes you through beautiful mountain towns and valleys.\n\nBy late afternoon, you arrive in the peaceful mountain village of Lohajung, your base for the trek. After checking into your homestay, you meet your trek leader for a detailed briefing about the upcoming days. The briefing covers the route, safety protocols, what to expect during the winter trek, and how to prepare for the snow-covered trails ahead. Enjoy a warm dinner and rest well, as the adventure into the alpine world begins tomorrow. The peaceful village environment is perfect for acclimatization and mental preparation.',
      },
      {
        day: 2,
        title: 'Lohajung → Bekaltal (9,800 ft)',
        description:
          'After breakfast, the trail begins with a steady ascent through dense oak and rhododendron forests. The sound of birds and the scent of the woods create a calming start to the trek. The initial 6 km trek (4–5 hours) takes you from 7,600 ft to 9,800 ft, with a moderate gradient that allows you to enjoy the natural beauty.\n\nAs you move higher, occasional clearings offer glimpses of snow-covered ridges and distant mountain peaks. The final stretch leads you to the beautiful Bekaltal region, tucked inside a forested bowl. Your tents are pitched close to the lake surroundings, offering a peaceful evening amid trees and fresh mountain air. The campsite location is particularly beautiful, with the forest providing shelter and the lake area offering tranquility.\n\nEnjoy hot meals prepared fresh by the trek cook and the quiet charm of the Himalayan outdoors. The evening is perfect for acclimatization and preparing for the higher altitudes ahead. The peaceful environment and the sound of nature create a perfect setting for a restful night.',
      },
      {
        day: 3,
        title: 'Bekaltal → Brahmatal Campsite (10,450 ft)',
        description:
          'The day begins with a gradual ascent through snow patches and open slopes. The trek (approximately 7 km, 5–6 hours) from 9,800 ft to 10,450 ft is steady and allows you to enjoy the changing landscape. As you leave the dense forests behind, the trail opens into wide meadows offering incredible views of Trishul and Nanda Ghunti.\n\nThe Brahmatal campsite sits in a vast snow-covered expanse during winter, making it one of the most scenic camping grounds in the region. The location offers expansive views in all directions, with the snow-covered landscape creating a magical winter wonderland. After reaching the campsite, you settle into your tents and spend the evening exploring the surroundings or simply relaxing.\n\nThe evening brings a warm dinner and clear night skies, making the campsite an unforgettable experience. The high altitude and clear skies offer incredible stargazing opportunities, and the peaceful mountain environment helps you relax and prepare for the summit day ahead. The trek leader briefs you about the summit climb, discussing the route, expected conditions, and what to expect during the early morning ascent.',
      },
      {
        day: 4,
        title: 'Brahmatal Summit (12,250 ft) → return to Lohajung',
        description:
          'Summit day begins early as you ascend towards the Brahmatal ridge, gradually gaining elevation until you reach the summit at 12,250 ft. The trek (approximately 10 km, 7–8 hours) is challenging but incredibly rewarding, taking you through snow-covered trails and open ridges. The early morning start allows you to witness the beautiful transition from darkness to dawn.\n\nThe view from the top is breathtaking, with commanding panoramas of Trishul, Nanda Ghunti, Chaukhamba, Nilkanth, and the vast Garhwal ranges. The 360-degree view makes all the effort worthwhile, and the sense of accomplishment is incredible. After spending time at the summit, taking photographs, and absorbing the incredible scenery, you begin your descent back to the Brahmatal region.\n\nYou continue toward Lohajung, with the downhill stretch being pleasant and scenic. The descent allows you to reflect on the incredible summit experience and enjoy the beautiful mountain scenery one last time. You reach Lohajung by late afternoon, where you check into your homestay for a warm dinner and rest after a long, rewarding day. The sense of accomplishment and the memories of the summit will stay with you forever.',
      },
      {
        day: 5,
        title: 'Lohajung → Rishikesh (Trek Ends)',
        description:
          'After breakfast, you board your vehicle for the return journey to Rishikesh. The scenic drive (approximately 250 km, 9–10 hours) retraces the same charming mountain roads and river valleys, giving you one last chance to enjoy the beauty of the Garhwal Himalayas. The journey takes you past the same river confluences, but now with a deeper appreciation for the natural beauty.\n\nYou arrive in Rishikesh by evening, where the trek officially concludes. With memories of frozen lakes, forest trails, snow-covered meadows, and the spectacular Brahmatal summit, the trek remains a cherished winter adventure. The combination of natural beauty, physical challenge, and the achievement of reaching the summit makes this trek a truly enriching experience that will inspire you to explore more of the winter Himalayas.',
      },
    ],
    whyChoose: [
      'Perfect winter trek: Brahmatal is one of the best winter treks in Uttarakhand, offering pristine snow-covered landscapes, frozen lakes, and a magical winter wonderland experience.',
      'Spectacular summit views: From the Brahmatal summit at 12,250 ft, you get commanding views of some of the most iconic peaks in the Garhwal Himalayas, including Trishul, Nanda Ghunti, Chaukhamba, and Nilkanth.',
      'Beautiful frozen lakes: The trek takes you past frozen lakes including Bekaltal and Brahmatal, which are particularly stunning in winter when covered in snow and ice.',
      'Beginner-friendly winter adventure: With an easy to moderate difficulty level, this trek is perfect for those looking to experience a winter Himalayan adventure without extreme technical challenges.',
      'Well-organized logistics: All permits, meals, transport from Rishikesh, accommodation, and expert winter trekking guidance are included, ensuring a safe and hassle-free experience.',
      'Cultural immersion: The journey takes you through traditional Garhwal villages, allowing you to experience local culture and the warm hospitality of mountain communities during the winter season.',
    ],
    discount: 26,
  },
  {
    id: 'himalayan-trek',
    title: 'Himalayan Summit Trek',
    region: 'North',
    location: 'Manali, Himachal Pradesh',
    duration: '8 Days / 7 Nights',
    price: 24999,
    image: northImage,
    description: 'Conquer the peaks with this exhilarating trek through the heart of the Himalayas. Experience snow-capped mountains and serene valleys. Navigate challenging trails and witness breathtaking summit views.',
    highlights: ['Camping under stars', 'Summit climb at 14,000ft', 'Local Himachali culture', 'Dense forest trails', 'Panoramic mountain vistas'],
    itinerary: [
      { day: 1, title: 'Arrival in Manali', description: 'Fly or drive to Manali. Check in to your accommodation. Acclimatization and local sightseeing to prepare for the trek ahead.' },
      { day: 2, title: 'Trek Base Camp (First Base)', description: 'Start the ascent from Manali. Trek through dense forests and meadows. Reach first base camp at 3,500m. Evening acclimatization walk.' },
      { day: 3, title: 'Advance Base Camp', description: 'Continue ascent to second base camp. Navigate steeper terrain and higher altitude. Sleep at 4,000m for further acclimatization.' },
      { day: 4, title: 'Summit Push Day', description: 'The challenging early morning climb to the summit at 14,000ft. Experience the most incredible sunrise from the peak with panoramic views of surrounding peaks. Return to base camp.' },
      { day: 5, title: 'Descent and Rest', description: 'Descend safely to the lower base camp. Rest and recover from the summit push.' },
    ],
    isHot: true,
  },
  {
    id: 'ladakh-adventure',
    title: 'Ladakh Bike Odyssey',
    region: 'North',
    location: 'Leh, Ladakh',
    duration: '7 Days / 6 Nights',
    price: 35000,
    image: ladakhImage,
    description: 'The ultimate biking adventure through the land of high passes. Ride on the world\'s highest motorable roads. Experience the breathtaking Pangong Lake, Nubra Valley, and conquer the legendary Khardung La Pass.',
    highlights: ['Pangong Lake at 14,270 ft', 'Nubra Valley biking', 'Khardung La Pass - world\'s highest motorable road', 'Magnetic Hill phenomenon', 'Ancient monasteries', 'Desert landscapes'],
    itinerary: [
      { day: 1, title: 'Leh Arrival', description: 'Arrive in Leh. Check in to your hotel. Rest and acclimatization to high altitude (11,500 ft). Light evening walk around Leh town.' },
      { day: 2, title: 'Local Sightseeing', description: 'Visit ancient monasteries including Thiksey and Hemis. Explore Shey Palace with golden Buddha statue. Visit the famous Magnetic Hill where gravity seems reversed. Evening acclimatization.' },
      { day: 3, title: 'Nubra Valley Expedition', description: 'Ride to Nubra Valley via the legendary Khardung La Pass (18,380 ft). Experience the stunning landscape of Nubra Valley. Visit Bactrian camel sands and remote villages. Return to Leh via scenic routes.' },
      { day: 4, title: 'Pangong Lake Adventure', description: 'Full day ride to Pangong Lake (14,270 ft) - one of the highest lakes in the world. Crystal clear waters with changing colors throughout the day. Camp by the lake or return to Leh.' },
      { day: 5, title: 'Biking Expeditions', description: 'Explore more high-altitude passes and villages. Visit remote monasteries. Experience pristine mountain terrain and local culture.' },
    ],
    isHot: true,
    discount: 10,
  },
  {
    id: 'kerala-bliss',
    title: 'Kerala Backwater Bliss',
    region: 'South',
    location: 'Alleppey, Kerala',
    duration: '5 Days / 4 Nights',
    price: 18500,
    image: southImage,
    description: 'Relax on a traditional houseboat as you drift through the tranquil backwaters of Kerala. Enjoy authentic cuisine, Ayurvedic treatments, and cultural performances in paradise.',
    highlights: ['Houseboat stay with traditional Kerala cuisine', 'Ayurvedic massage and wellness', 'Kathakali dance performance', 'Village canoe rides', 'Coconut plantations', 'Chinese fishing nets'],
    itinerary: [
      { day: 1, title: 'Arrival in Kochi', description: 'Arrive in Kochi. Transfer to Alleppey (1 hour). Check in to your houseboat. Evening orientation and sunset cruise on the backwaters.' },
      { day: 2, title: 'Full Day Houseboat Cruise', description: 'Cruise through intricate network of backwaters. Pass by coconut plantations and fishing villages. Observe traditional Chinese fishing nets. Enjoy fresh Kerala meals prepared onboard.' },
      { day: 3, title: 'Village Exploration & Wellness', description: 'Visit a local village by canoe. Interact with spice farmers. Afternoon Ayurvedic massage and spa treatment. Evening Kathakali dance performance with dinner.' },
      { day: 4, title: 'Water Activities', description: 'Swimming in the backwaters. Fishing with locals. Visit a bird sanctuary. Explore hidden lagoons and lesser-known waterways.' },
      { day: 5, title: 'Departure', description: 'Leisurely breakfast on the houseboat. Transfer back to Kochi airport or railway station.' },
    ],
  },
  {
    id: 'andaman-deep-blue',
    title: 'Andaman Deep Blue',
    region: 'South',
    location: 'Havelock Island, Andaman',
    duration: '6 Days / 5 Nights',
    price: 42000,
    image: andamanImage,
    description: 'Dive into the crystal clear waters of Andaman and explore the vibrant coral reefs. Perfect for beach lovers, scuba enthusiasts, and adventure seekers seeking tropical paradise.',
    highlights: ['Scuba Diving with coral reefs', 'Radhanagar Beach pristine sands', 'Bioluminescent beach nights', 'Water sports activities', 'Snorkeling adventures', 'Marine wildlife encounters'],
    itinerary: [
      { day: 1, title: 'Port Blair Arrival', description: 'Arrive in Port Blair. Visit the historic Cellular Jail and museum. Learn about the island\'s history. Evening at harbor exploring local markets.' },
      { day: 2, title: 'Ferry to Havelock Island', description: 'Take scenic ferry to Havelock Island (2 hours). Check into beachfront resort. Relax on pristine Radhanagar Beach. Evening water activities.' },
      { day: 3, title: 'Scuba Diving & Snorkeling', description: 'Professional scuba diving lesson and exploration of coral reefs. Discover vibrant marine life and colorful fish. Alternative snorkeling for non-divers.' },
      { day: 4, title: 'Beach Adventure', description: 'Parasailing and jet skiing. Visit Kala Pathar Beach. Swim in crystal clear lagoons. Photography session at sunset.' },
      { day: 5, title: 'Bioluminescent Beach & Water Activities', description: 'Witness magical bioluminescent plankton at night beach. Day activities include kayaking through mangroves or island hopping by speedboat.' },
      { day: 6, title: 'Departure', description: 'Final beach time. Return ferry to Port Blair. Depart with unforgettable memories.' },
    ],
    isHot: true,
  },
  {
    id: 'darjeeling-delight',
    title: 'Darjeeling Tea Trails',
    region: 'East',
    location: 'Darjeeling, West Bengal',
    duration: '4 Days / 3 Nights',
    price: 15999,
    image: eastImage,
    description: 'Sip the world\'s finest tea while overlooking the Kanchenjunga. A perfect getaway for peace lovers.',
    highlights: ['Sunrise at Tiger Hill', 'Tea garden tour', 'Toy Train ride'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Check in to tea estate resort.' },
      { day: 2, title: 'Tiger Hill', description: 'Early morning sunrise view.' },
    ],
  },
  {
    id: 'rajasthan-royals',
    title: 'Royal Rajasthan Safari',
    region: 'West',
    location: 'Jaisalmer, Rajasthan',
    duration: '6 Days / 5 Nights',
    price: 28000,
    image: westImage,
    description: 'Live like royalty in heritage forts and experience the magic of the Thar desert on a camel safari.',
    highlights: ['Desert camping', 'Fort tours', 'Folk music night'],
    itinerary: [
      { day: 1, title: 'Jaipur Arrival', description: 'City palace tour.' },
      { day: 2, title: 'Jodhpur', description: 'Travel to the Blue City.' },
      { day: 3, title: 'Jaisalmer', description: 'Desert safari and camping.' },
    ],
  },
  {
    id: 'goa-party',
    title: 'Goa Sun & Sand',
    region: 'West',
    location: 'North Goa',
    duration: '4 Days / 3 Nights',
    price: 12000,
    image: goaImage,
    description: 'The party capital of India. Sun, sand, sea, and endless nightlife awaits you.',
    highlights: ['Beach Parties', 'Water Sports', 'Old Goa Churches'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Check in to beach resort.' },
      { day: 2, title: 'North Goa', description: 'Beach hopping and water sports.' },
    ],
    discount: 15,
  },
  {
    id: 'santorini-escape',
    title: 'Greek Island Hopping',
    region: 'Foreign',
    location: 'Santorini, Greece',
    duration: '7 Days / 6 Nights',
    price: 145000,
    image: foreignImage,
    description: 'Experience the romance of the Aegean Sea with our premium Greek island tour.',
    highlights: ['Oia Sunset', 'Volcano boat tour', 'Wine tasting'],
    itinerary: [
      { day: 1, title: 'Athens', description: 'Arrival and Acropolis tour.' },
      { day: 2, title: 'Ferry to Santorini', description: 'Scenic boat ride.' },
      { day: 3, title: 'Oia Exploration', description: 'Walking tour of the famous blue domes.' },
    ],
  },
  {
    id: 'bali-swing',
    title: 'Tropical Bali Escape',
    region: 'Foreign',
    location: 'Ubud, Bali',
    duration: '6 Days / 5 Nights',
    price: 65000,
    image: baliImage,
    description: 'Immerse yourself in the spiritual and natural beauty of Bali. From temples to rice terraces.',
    highlights: ['Bali Swing', 'Monkey Forest', 'Uluwatu Temple'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Transfer to Ubud.' },
      { day: 2, title: 'Ubud Tour', description: 'Rice terraces and swing.' },
    ],
    isHot: true,
  },
  {
    id: 'maldives-luxury',
    title: 'Maldives Water Villa',
    region: 'Foreign',
    location: 'Maldives',
    duration: '5 Days / 4 Nights',
    price: 120000,
    image: maldivesImage,
    description: 'Ultimate luxury in your private water villa. Crystal clear lagoons and white sandy beaches.',
    highlights: ['Water Villa Stay', 'Snorkeling', 'Sunset Cruise'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Speedboat transfer to resort.' },
      { day: 2, title: 'Leisure', description: 'Enjoy the water villa.' },
    ],
    discount: 5,
  },
   {
    id: 'vietnam-explorer',
    title: 'Vietnam Highlights',
    region: 'Foreign',
    location: 'Da Nang, Vietnam',
    duration: '7 Days / 6 Nights',
    price: 55000,
    image: vietnamImage,
    description: 'Discover the ancient history and stunning landscapes of Vietnam. From Golden Bridge to Ha Long Bay.',
    highlights: ['Golden Bridge', 'Ha Long Bay', 'Hoi An Ancient Town'],
    itinerary: [
      { day: 1, title: 'Da Nang', description: 'Arrival and Golden Bridge.' },
      { day: 2, title: 'Hoi An', description: 'Walking tour.' },
    ],
    isHot: true,
  },
];

export const packages: Package[] = basePackages.map((p) => {
  const a = trekAssets[p.id];
  if (!a || !a.cover || !a.gallery || a.gallery.length === 0) return p;
  return {
    ...p,
    image: a.cover,
    gallery: a.gallery,
    itineraryPdfUrl: a.itineraryPdfUrl,
  };
});

export { heroImage };
