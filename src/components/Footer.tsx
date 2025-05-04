
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full backdrop-blur-md bg-white/30 dark:bg-navy-900/30 mt-12 py-10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-700 dark:from-gold-400 dark:to-gold-600 mb-2">
            Giá Vàng Việt Nam
          </h2>
          <p className="text-center text-muted-foreground max-w-lg">
            Cập nhật liên tục giá vàng mới nhất từ các nhà cung cấp uy tín tại Việt Nam
          </p>
        </div>
        
        <Separator className="mb-8 opacity-30" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-gold-600 dark:text-gold-400">Về chúng tôi</h3>
            <p className="text-muted-foreground text-sm">
              Cập nhật giá vàng mới nhất từ các nhà cung cấp lớn nhất tại Việt Nam: SJC, DOJI, và PNJ.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4 text-gold-600 dark:text-gold-400">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-gold-500 transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-gold-500 transition-colors">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-gold-500 transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-gold-500 transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-4 text-gold-600 dark:text-gold-400">Thông tin pháp lý</h3>
            <p className="text-muted-foreground text-sm">
              Trang web này cung cấp thông tin tham khảo và không đưa ra lời khuyên đầu tư. 
              Giá vàng có thể thay đổi tùy theo thời điểm và nhà cung cấp.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-white/10 text-center text-sm text-muted-foreground">
          © {currentYear} Giá Vàng Việt Nam. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
