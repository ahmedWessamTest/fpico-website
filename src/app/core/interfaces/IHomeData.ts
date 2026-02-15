export interface IHomeData {
  chairMessage: ChairMessage;
  aboutData: AboutData;
  services: Service[];
  projects: Project[];
  partners: Partner[];
  clients: Partner[];
  whyus: Whyus[];
  arrigationSystems: ArrigationSystem[];
  youtubeurls: YoutubeSlider[];
}

export interface ArrigationSystem {
  id: number;
  en_title: null | string;
  ar_title: null | string;
  en_text: string;
  ar_text: string;
  active_status: number;
  created_at: string;
  updated_at: string;
}

export interface Whyus {
  id: number;
  why_us_number: null | string;
  en_why_us_title: null | string;
  ar_why_us_title: null | string;
  en_why_us_text: null | string;
  ar_why_us_text: null | string;
  active_status: null | number;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: number;
  main_image: string;
  en_partner_title: string;
  ar_partner_title: string;
  url_link: string;
  partner_type: string;
  active_status: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  en_service_title: string;
  ar_service_title: string;
  en_service_text: string;
  ar_service_text: null | string;
  en_slug: null;
  ar_slug: null;
  en_meta_title: string;
  ar_meta_title: string;
  en_meta_text: string;
  ar_meta_text: null | string;
  service_type: string;
  main_image: string;
  home_status: number;
  active_status: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  en_service_title: string;
  ar_service_title: string;
  en_service_text: string;
  ar_service_text: string;
  en_slug: null;
  ar_slug: null;
  en_meta_title: string;
  ar_meta_title: string;
  en_meta_text: string;
  ar_meta_text: string;
  service_type: string;
  main_image: string;
  home_status: number;
  active_status: number;
  created_at: string;
  updated_at: string;
}

export interface AboutData {
  id: number;
  en_stand_for_title: string;
  ar_stand_for_title: string;
  en_stand_for_text: string;
  ar_stand_for_text: string;
  en_mission_title: string;
  ar_mission_title: string;
  en_mission_text: string;
  ar_mission_text: string;
  en_vision_title: string;
  ar_vision_title: string;
  en_vision_text: string;
  ar_vision_text: string;
  en_main_text: string;
  ar_main_text: string;
  en_meta_title: string;
  ar_meta_title: string;
  en_meta_text: string;
  ar_meta_text: string;
  created_at: null;
  updated_at: string;
}

export interface ChairMessage {
  id: number;
  main_image: string;
  en_name: string;
  ar_name: string;
  en_small_title: string;
  ar_small_title: string;
  en_title: string;
  ar_title: string;
  en_text: string;
  ar_text: string;
  created_at: null;
  updated_at: string;
}

export interface YoutubeSlider {
  id: number;
  en_title: string;
  ar_title: string;
  main_image: string;
  main_url: string;
  active_status: number;
  created_at: string;
  updated_at: string;
}
