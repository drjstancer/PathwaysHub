import PrototypeNav from '@/components/PrototypeNav';

export default function PrototypeLayout({children}:{children:React.ReactNode}){
  return <>
    <div className="prototype-banner"><strong>Prototype Showcase</strong><span>Synthetic data only · presentation-ready concept pages</span></div>
    <PrototypeNav/>
    {children}
  </>;
}
