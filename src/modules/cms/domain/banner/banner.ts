export type HtmlTarget = '_blank' | '_self' | '_parent' | '_top';

export interface Banner {
  htmlTarget: string;
  imageUrl: string;
  layout: string;
  mobileImageUrl: string;
  showButton: boolean;
  showSubtitle: boolean;
  showTitle: boolean;
  subtitle?: string;
  tabletImageUrl: string;
  title?: string;
  type: string;
  externalLink?: string;
  internalItemId?: number;
  internalType?: string;
}

// function getDeviceNameByWidth(): 'mobile' | 'tablet' | 'PC' {
//   const width = window.innerWidth;
//   if (width < 479) {
//     return 'mobile';
//   }
//   if (width < 959) {
//     return 'tablet';
//   }
//   return 'PC';
// }

// export function getTheImageTypeByDevice():
//   | 'mobileImageUrl'
//   | 'tabletImageUrl'
//   | 'imageUrl' {
//   const deviceName = getDeviceNameByWidth();
//   switch (deviceName) {
//     case 'mobile':
//       return 'mobileImageUrl';
//     case 'tablet':
//       return 'tabletImageUrl';
//     default:
//       return 'imageUrl';
//   }
// }
