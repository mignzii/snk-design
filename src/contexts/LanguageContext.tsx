import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  fr: {
    // Header
    'menu.home': 'ACCUEIL',
    'menu.boubou': 'BOUBOU',
    'menu.ramadan': 'COLLECTION RAMADAN',
    'menu.dresses': 'ROBES',
    'menu.sets': 'ENSEMBLES',
    'menu.accessories': 'ACCESSOIRES',
    'menu.about': 'À PROPOS',
    'menu.faq': 'FAQ',
    'header.promo1': 'Black Friday : jusqu\'à -30 % sur toute la boutique !',
    'header.promo2': 'Nouvelles collections disponibles maintenant !',
    'header.promo3': 'Livraison gratuite dès 3 articles',
    
    // Cart
    'cart.title': 'Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.items': 'article',
    'cart.items_plural': 'articles',
    'cart.total': 'Total',
    'cart.checkout': 'Commander',
    'cart.creating': 'Création...',
    'cart.promo_code': 'Code promo',
    'cart.promo_placeholder': 'Entrez votre code',
    'cart.apply': 'Appliquer',
    'cart.size': 'Taille',
    'cart.length': 'Longueur',
    
    // Product
    'product.add_to_cart': 'Ajouter au panier',
    'product.quick_view': 'Aperçu rapide',
    'product.select_size': 'Sélectionner une taille',
    'product.one_size': 'Taille unique',
    'product.size_info': 'Les robes sont en taille unique, mais contiennent des ceintures intérieures ajustables qui s\'adaptent à la morphologie de chaque personne.',
    'product.custom_size': 'Taille personnalisée (facultatif)',
    'product.custom_length': 'Longueur personnalisée (facultatif)',
    'product.description': 'Description',
    'product.details': 'Détails & Composition',
    'product.shipping': 'Livraison & Retours',
    'product.shipping_text': 'Livraison gratuite à l\'achat de 3 articles et plus • Retour à vos frais • Délai de livraison : 3 à 5 jours ouvrables',
    
    // Features
    'features.free_shipping': 'Livraison Gratuite',
    'features.free_shipping_desc': 'À l\'achat de 3 articles',
    'features.returns': 'Retours',
    'features.returns_desc': 'Retour à vos frais',
    'features.delivery': 'Délai de Livraison',
    'features.delivery_desc': '3 à 5 jours ouvrables',
    'features.quality': 'Qualité Premium',
    'features.quality_desc': 'Matériaux de haute qualité',
    
    // Common
    'common.loading': 'Chargement...',
    'common.search': 'Rechercher',
    'common.wishlist': 'Liste de souhaits',
    'common.account': 'Compte',
  },
  en: {
    // Header
    'menu.home': 'HOME',
    'menu.boubou': 'BOUBOU',
    'menu.ramadan': 'RAMADAN COLLECTION',
    'menu.dresses': 'DRESSES',
    'menu.sets': 'SETS',
    'menu.accessories': 'ACCESSORIES',
    'menu.about': 'ABOUT',
    'menu.faq': 'FAQ',
    'header.promo1': 'Black Friday: up to -30% off entire store!',
    'header.promo2': 'New collections available now!',
    'header.promo3': 'Free shipping on 3+ items',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.items': 'item',
    'cart.items_plural': 'items',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.creating': 'Creating...',
    'cart.promo_code': 'Promo Code',
    'cart.promo_placeholder': 'Enter your code',
    'cart.apply': 'Apply',
    'cart.size': 'Size',
    'cart.length': 'Length',
    
    // Product
    'product.add_to_cart': 'Add to Cart',
    'product.quick_view': 'Quick View',
    'product.select_size': 'Select a size',
    'product.one_size': 'One Size',
    'product.size_info': 'Dresses are one size fits all, but contain adjustable inner belts that adapt to each person\'s body shape.',
    'product.custom_size': 'Custom Size (optional)',
    'product.custom_length': 'Custom Length (optional)',
    'product.description': 'Description',
    'product.details': 'Details & Composition',
    'product.shipping': 'Shipping & Returns',
    'product.shipping_text': 'Free shipping on purchase of 3 items or more • Returns at your expense • Delivery time: 3 to 5 business days',
    
    // Features
    'features.free_shipping': 'Free Shipping',
    'features.free_shipping_desc': 'On purchase of 3 items',
    'features.returns': 'Returns',
    'features.returns_desc': 'Returns at your expense',
    'features.delivery': 'Delivery Time',
    'features.delivery_desc': '3 to 5 business days',
    'features.quality': 'Premium Quality',
    'features.quality_desc': 'High quality materials',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.wishlist': 'Wishlist',
    'common.account': 'Account',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'fr') ? saved : 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
