import { useContext, useState } from "react";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Textarea } from "@/lib/components/ui/textarea";
import { ArrowLeft, ArrowRight, Package, CreditCard, Check, Loader2, Zap, Link } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createNewCartOrder } from "@/api/server-actions/cart.actions";
import { CartContext } from "@/lib/context/CartContext";
import { useAuthenticatedUser } from "@/lib/hooks/useAuthenticatedUser";

const STEPS = ['SHIPPING', 'REVIEW', 'CONFIRM'];

const ButtonComponent: any = Button;
const LabelComponent: any = Label;
const InputComponent: any = Input;
const TextareaComponent: any = Textarea;

const getCardItemsTotal = (items: { price: number }[], by = "price") => {
  return items.reduce((total, item) => total += (item as any)[by], 0);
};

export default function CheckoutPage() {
  const { user } = useAuthenticatedUser();
  const { clearCart, cartItems } = useContext(CartContext);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [orderContactForm, setOrderContactForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    home_address: '',
    city: '',
    zip_code: '',
    country: '',
    notes: '',
  });

  const updateField = (fieldName: string, fieldValue: string) => setOrderContactForm(prev => ({
    ...prev,
    [fieldName]: fieldValue,
  }));

  const contactFieldsFilled =
    orderContactForm.full_name &&
    orderContactForm.email &&
    orderContactForm.home_address &&
    orderContactForm.phone &&
    orderContactForm.city &&
    orderContactForm.country;
  const canProceed = step === 0
    ? !!user || contactFieldsFilled
    : true;

  const handleSubmit = async () => {
    setSubmitting(true);

    const values = {
      shippingContactInfo: orderContactForm,
      items: cartItems,
    };
    await createNewCartOrder(values, user);
    
    clearCart();
    setStep(2);
    setSubmitting(false);
    toast.success('Order placed successfully!');
  };

  if (cartItems.length === 0 && step < 2) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-mono text-muted-foreground text-sm mb-4">YOUR CART IS EMPTY</p>
          <Link to="/products">
            <ButtonComponent variant="outline" className="font-mono text-sm gap-2">
              <ArrowLeft className="w-4 h-4" /> BROWSE PRODUCTS
            </ButtonComponent>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> BACK TO PRODUCTS
        </Link>

        <h1 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight mb-2">CHECKOUT</h1>
        <p className="font-mono text-sm text-muted-foreground mb-8">PROGRESSIVE ACTIVATION SEQUENCE</p>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono tracking-wider transition-all ${
                i <= step
                  ? 'border-primary/50 bg-primary/10 text-primary'
                  : 'border-border bg-card/30 text-muted-foreground'
              }`}>
                {i < step ? <Check className="w-3 h-3" /> : <span className="w-3 text-center">{i + 1}</span>}
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-px ${i < step ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-xl border border-border bg-card/40">
                <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" /> SHIPPING INFORMATION
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">FULL NAME *</LabelComponent>
                    <InputComponent value={orderContactForm.full_name} onChange={(e: any) => updateField('full_name', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">EMAIL *</LabelComponent>
                    <InputComponent type="email" value={orderContactForm.email} onChange={(e: any) => updateField('email', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">ADDRESS *</LabelComponent>
                    <InputComponent value={orderContactForm.home_address} onChange={(e: any) => updateField('home_address', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">CITY *</LabelComponent>
                    <InputComponent value={orderContactForm.city} onChange={(e: any) => updateField('city', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">ZIP / POSTAL</LabelComponent>
                    <InputComponent value={orderContactForm.zip_code} onChange={(e: any) => updateField('zip_code', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">COUNTRY *</LabelComponent>
                    <InputComponent value={orderContactForm.country} onChange={(e: any) => updateField('country', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">PHONE</LabelComponent>
                    <InputComponent value={orderContactForm.phone} onChange={(e: any) => updateField('phone', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">NOTES</LabelComponent>
                    <TextareaComponent value={orderContactForm.notes} onChange={(e: any) => updateField('notes', e.target.value)} className="bg-secondary border-border font-mono" rows={3} />
                  </div>
                </div>
              </div>

              <ButtonComponent
                onClick={() => setStep(1)}
                disabled={!canProceed}
                className="w-full h-12 bg-primary text-primary-foreground font-heading font-bold tracking-wider haptic-btn gap-2"
              >
                PROCEED TO REVIEW <ArrowRight className="w-4 h-4" />
              </ButtonComponent>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Order summary */}
              <div className="p-6 rounded-xl border border-border bg-card/40">
                <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" /> ORDER SUMMARY
                </h2>
                <div className="divide-y divide-border/50">
                  {cartItems.map(item => (
                    <div key={item.product_id} className="flex items-center justify-between py-3 text-sm">
                      <div>
                        <p className="font-heading font-medium">{item.product_name}</p>
                        <p className="text-xs font-mono text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-mono text-primary font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">Weight: {getCardItemsTotal(cartItems, "weight")} kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-muted-foreground">TOTAL</p>
                    <p className="text-2xl font-heading font-bold text-primary">${getCardItemsTotal(cartItems, "price")}</p>
                  </div>
                </div>
              </div>

              {/* Shipping info */}
              <div className="p-6 rounded-xl border border-border bg-card/40">
                <p className="text-xs font-mono text-muted-foreground tracking-wider mb-3">SHIP TO</p>
                <p className="text-sm font-mono">{orderContactForm.full_name}</p>
                <p className="text-sm font-mono text-muted-foreground">{orderContactForm.home_address}</p>
                <p className="text-sm font-mono text-muted-foreground">{orderContactForm.city} {orderContactForm.zip_code}</p>
                <p className="text-sm font-mono text-muted-foreground">{orderContactForm.country}</p>
              </div>

              <div className="flex gap-3">
                <ButtonComponent variant="outline" onClick={() => setStep(0)} className="flex-1 h-12 font-heading font-bold tracking-wider haptic-btn">
                  BACK
                </ButtonComponent>
                <ButtonComponent
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-2 h-12 bg-primary text-primary-foreground font-heading font-bold tracking-wider haptic-btn gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {submitting ? 'PROCESSING...' : 'PLACE ORDER'}
                </ButtonComponent>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-3">ORDER CONFIRMED</h2>
              <p className="font-mono text-sm text-muted-foreground max-w-md mx-auto mb-8">
                Your order has been placed successfully. Well send confirmation details to {orderContactForm.email}.
              </p>
              <Link to="/products">
                <ButtonComponent className="bg-primary text-primary-foreground font-heading font-bold tracking-wider haptic-btn gap-2">
                  CONTINUE SHOPPING <ArrowRight className="w-4 h-4" />
                </ButtonComponent>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
