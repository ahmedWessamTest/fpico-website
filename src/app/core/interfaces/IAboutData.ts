export interface IAboutData {
  aboutdata: Aboutdata;
  chairmessage: Chairmessage;
  features: Feature[];
  clients: Client[];
}

export interface Client {
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

export interface Feature {
  id: number;
  icon_image: string;
  en_title: string;
  ar_title: string;
  en_text: string;
  ar_text: string;
  active_status: number;
  created_at: string;
  updated_at: string;
}

export interface Chairmessage {
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

export interface Aboutdata {
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
