"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !svgRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Text animation from right - triggers immediately when section is in view
      gsap.from(textRef.current?.querySelectorAll("h2, p"), {
        x: 150,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      })

      // SVG line drawing animation - starts AFTER section is fully reached
      const paths = svgRef.current?.querySelectorAll("path")
      paths?.forEach((path, index) => {
        const length = path.getTotalLength()
        
        // Set up the starting positions
        path.style.strokeDasharray = length.toString()
        path.style.strokeDashoffset = length.toString()
        
        // Animate the line drawing - starts after section is completely on screen
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          delay: index * 0.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            pin: sectionRef.current,
            pinSpacing: false,
          },
        })
      })

      // Fade in SVG container
      gsap.from(svgRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <section
        id="about"
        ref={sectionRef}
        className="sticky top-0 h-screen bg-[#0A1931] py-16 px-8 md:px-16 lg:px-24 flex items-center"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Flowing Line Drawing - Left Side */}
          <div className="flex items-center justify-center h-full">
            <svg
              ref={svgRef}
              viewBox="0 0 80 480"
              className="w-full max-w-sm h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Exact path from provided coordinates */}
              <path
                d="M 71,0 L 70,3.131969208243991 L 69,6.263938416487982 L 68,9.395907624731972 L 67.13147077151001,12.737058456979973 L 66,16.016137210966566 L 65,19.326252004083866 L 64,22.458221212327857 L 63,25.590190420571844 L 62.04458486383868,28.910830272322645 L 61,32.30521108179419 L 60,35.61653083616481 L 59,38.9485000444088 L 58,42.28046925265279 L 57,45.61243846089678 L 56,48.94440766914077 L 55,52.27637687738476 L 54,55.608346085628754 L 53,58.940315293872744 L 52,62.27228450211673 L 51,65.60425371036072 L 50,68.93622291860471 L 49,72.2681921268487 L 48,75.60016133509269 L 47,78.93213054333668 L 46,82.26409975158067 L 45,85.59606895982466 L 44,88.92803816806865 L 43,92.26000737631264 L 42,95.59197658455663 L 41,98.92394579280062 L 40,102.25591500104461 L 39,105.5878842092886 L 38,108.91985341753258 L 37,112.25182262577657 L 36,115.58379183402056 L 35,118.91576104226455 L 34,122.24773025050854 L 33,125.57969945875253 L 32,128.91166866699652 L 31,132.2436378752405 L 30,135.5756070834845 L 29,138.90757629172847 L 28,142.23954549997246 L 27,145.57151470821645 L 26,148.90348391646044 L 25,152.23545312470443 L 24,155.56742233294842 L 23,158.8993915411924 L 22,162.2313607494364 L 21,165.56332995768037 L 20,168.89529916592436 L 19,172.22726837416835 L 18,175.55923758241234 L 17,178.89120679065633 L 16,182.22317599890032 L 15,185.5551452071443 L 14,188.8871144153883 L 13,192.21908362363227 L 12,195.55105283187626 L 11,198.88302204012025 L 10,202.21499124836424 L 9,205.54696045660823 L 8,208.87892966485222 L 7,212.2108988730962 L 6,215.5428680813402 L 5,218.87483728958418 L 4,222.20680649782817 L 3,225.53877570607216 L 2,228.87074491431615 L 1,232.20271412256014 L 0,235.53468333080413 L 0,238.86665253904812 L 0,242.1986217472921 L 0,245.5305909555361 L 0,248.86256016378007 L 0,252.19452937202406 L 0,255.52649858026805 L 0,258.85846778851204 L 0,262.19043699675603 L 0,265.522406205 L 0,268.854375413244 L 0,272.18634462148797 L 0,275.51831382973196 L 0,278.85028303797595 L 0,282.18225224621994 L 0,285.51422145446393 L 0,288.8461906627079 L 0,292.1781598709519 L 0,295.51012907919587 L 0,298.84209828743986 L 0,302.17406749568385 L 0,305.50603670392784 L 0,308.83800591217183 L 0,312.1699751204158 L 0,315.5019443286598 L 0,318.83391353690377 L 0,322.16588274514776 L 0,325.49785195339175 L 0,328.82982116163574 L 0,332.1617903698797 L 0,335.4937595781237 L 0,338.82572878636767 L 0,342.15769799461166 L 0,345.48966720285565 L 0,348.82163641109964 L 0,352.1536056193436 L 0,355.4855748275876 L 0,358.81754403583157 L 0,362.14951324407556 L 0,365.48148245231955 L 0,368.81345166056354 L 0,372.1454208688075 L 0,375.4773900770515 L 0,378.8093592852955 L 0,382.14132849353947 L 0,385.47329770178346 L 0,388.80526691002745 L 0,392.13723611827144 L 0,395.4692053265154 L 0,398.8011745347594 L 0,402.13314374300337 L 0,405.46511295124736 L 0,408.79708215949135 L 0,412.12905136773534 L 0,415.46102057597933 L 0,418.7929897842233 L 0,422.1249589924673 L 0,425.45692820071127 L 0,428.78889740895526 L 0,432.12086661719925 L 0.5279187817258887,435.2766947004517 L 1.1089978109378124,438.40921849376956 L 1.746031746031746,441.51862651189295 L 2.441819320214664,444.6051072695622 L 3.199163269536489,447.6688492815176 L 4.020871336011124,450.7100410624995 L 4.909756255666568,453.7288711272482 L 5.868635762509681,456.7255279905041 L 6.9003325915369775,459.7002001670075 L 8.007674901002637,462.653076535353"
                stroke="#FEF3C7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Text Content - Right Side */}
          <div ref={textRef} className="space-y-4">
            <h2 className="editorial-title text-4xl md:text-6xl text-[#FDF8F3] mb-6">
              About Us
            </h2>
            <div className="editorial-body text-base md:text-lg text-[#FDF8F3]/80 space-y-4">
              <p>
                Beschi SSC Ltd emerged from a simple belief: great ideas deserve great partnerships. We're a venture studio that doesn't just invest—we build alongside founders.
              </p>
              <p className="text-[#FEF3C7] font-semibold">
                We've helped launch over 40 ventures, turning concepts into market leaders. We bring capital, expertise, and commitment to see your vision through—from idea to impact.
              </p>
            </div>
          </div>
        </div>
        
        {/* Curvaceous border at bottom transitioning to Services section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg 
            className="relative block w-full h-[80px] md:h-[120px]" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,30 C200,80 400,10 600,40 C800,70 1000,20 1200,50 L1200,120 L0,120 Z" 
              fill="#FDF8F3"
            />
          </svg>
        </div>
      </section>
    </div>
  )
}