export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
     <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        zoomAndPan="magnify"
        viewBox="0 0 323.05039 53.105473"
        preserveAspectRatio="xMidYMid"
        version="1.0"
        id="svg239"
        {...props}
     >
        <defs id="defs161">
           <filter x="0" y="0" width="1" height="1" id="5eab51cbb7">
              <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" color-interpolation-filters="sRGB" id="feColorMatrix132"/>
           </filter>
           <filter x="0" y="0" width="1" height="1" id="d9e20a4ea2">
              <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.2126 0.7152 0.0722 0 0" color-interpolation-filters="sRGB" id="feColorMatrix135"/>
           </filter>
           <clipPath id="e0b7a7bbcd">
              <path d="M 0.121094,0 H 348.87891 V 117.5 H 0.121094 Z m 0,0" clip-rule="nonzero" id="path140"/>
           </clipPath>
           <clipPath id="4d08c4ce60">
              <path d="M 7,59.054688 H 45 V 86.042969 H 7 Z m 0,0" clip-rule="nonzero" id="path143"/>
           </clipPath>
           <mask id="9cbcf06372">
              <g filter="url(#5eab51cbb7)" id="g151">
                 <g filter="url(#d9e20a4ea2)" transform="matrix(0.0816766,0,0,0.0816766,6.746475,59.053248)" id="g149">
                    <image x="0" y="0" width="469" xlinkHref="data:image/png;base64,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mHrZJ040QA4x7fq7nUQADHAAnv7Vr5agbWkKoF2lKyYQOHr2haePBJCjPceAdwqFYKA1QPdT9/33k2hnmgJoY84YkwOYOPO8M48CgLx2InjJYkth7XR2BwCvPjxv4SoALqSaGaynnYVqhAEwx848e/pkCwA5yhJboieeFCsAsGbxY48+9RYgtu0hRdvbNzHwANwR00+bMWU8AIAhQASy60oKE2K+8x8kKNLzVHPjssWLnl75FgCLuMuRGtaBEjQCDwCjJh8zfdqkcQe+8xuSLNarWCKyx+W+sWHliheWLt8KAMZ0Ikl7dKgIxey6jQ8eP2nyIRMmjDlw/+GVIsVzt1DdvnXrG2tfWbtmzYZNAAAxYOciCnR2hGFE3rmfR44YPnLUyH2HdTlnixFd7333jrf+sG37Wzu6d/3MGHIQbKrQ8QIUEWGn7+0BMyLEYIhnTcejuosAMniupnGEHhyilFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppdSA/X+bikFEDIUDywAAAABJRU5ErkJggg==" height="469" preserveAspectRatio="xMidYMid" id="image147"/>
                 </g>
              </g>
           </mask>
           <clipPath id="f7f4597995">
              <path d="M 0.121094,33.195312 H 21.882812 V 67 H 0.121094 Z m 0,0" clip-rule="nonzero" id="path155"/>
           </clipPath>
           <clipPath id="a362a29737">
              <path d="M 0.121094,52 H 21.882812 V 86.300781 H 0.121094 Z m 0,0" clip-rule="nonzero" id="path158"/>
           </clipPath>
        </defs>
        <g fill="#000000" fill-opacity="1" id="g173" transform="translate(-0.128906,-33.195314)">
           <g transform="translate(39.527621,84.092087)" id="g171">
              <g id="g169">
                 <path d="M 6.390625,-48.171875 H 34.25 v 7.5 h -9.40625 v 33.1875 H 34.25 V 0 H 6.390625 v -7.484375 h 9.15625 v -33.1875 h -9.15625 z m 0,0" id="path167"/>
              </g>
           </g>
        </g>
        <g fill="#000000" fill-opacity="1" id="g181" transform="translate(-0.128906,-33.195314)">
           <g transform="translate(80.185707,84.092087)" id="g179">
              <g id="g177">
                 <path d="M 36.09375,0 H 26.828125 L 13.4375,-31.0625 V 0 h -9.375 v -48.171875 h 9.375 l 13.296875,30.9375 0.03125,-30.9375 h 9.328125 z m 0,0" id="path175"/>
              </g>
           </g>
        </g>
        <g fill="#000000" fill-opacity="1" id="g189" transform="translate(-0.128906,-33.195314)">
           <g transform="translate(120.84379,84.092087)" id="g187">
              <g id="g185">
                 <path d="m 18.6875,-19.78125 -5.09375,5.59375 V 0 H 4.265625 v -48.171875 h 9.328125 v 22.0625 L 17.96875,-32 29.6875,-48.171875 h 11.375 L 24.84375,-26.875 41.65625,0 H 30.609375 Z m 0,0" id="path183"/>
              </g>
           </g>
        </g>
        <g fill="#000000" fill-opacity="1" id="g197" transform="translate(-0.128906,-33.195314)">
           <g transform="translate(161.50188,84.092087)" id="g195">
              <g id="g193">
                 <path d="m 29.34375,-12.578125 c 0,-0.851563 -0.152344,-1.65625 -0.453125,-2.40625 -0.292969,-0.75 -0.796875,-1.445313 -1.515625,-2.09375 -0.710938,-0.65625 -1.648438,-1.253906 -2.8125,-1.796875 -1.15625,-0.539062 -2.59375,-1.039062 -4.3125,-1.5 -2.09375,-0.582031 -4.101562,-1.300781 -6.015625,-2.15625 -1.90625,-0.863281 -3.589844,-1.898438 -5.046875,-3.109375 -1.449219,-1.21875 -2.609375,-2.628906 -3.484375,-4.234375 -0.867187,-1.613281 -1.296875,-3.46875 -1.296875,-5.5625 0,-2.03125 0.425781,-3.875 1.28125,-5.53125 0.863281,-1.65625 2.054688,-3.066406 3.578125,-4.234375 1.519531,-1.164063 3.316406,-2.0625 5.390625,-2.6875 2.070312,-0.632813 4.320312,-0.953125 6.75,-0.953125 2.519531,0 4.820312,0.367188 6.90625,1.09375 2.082031,0.730469 3.875,1.75 5.375,3.0625 1.5,1.3125 2.664062,2.875 3.5,4.6875 0.84375,1.804688 1.265625,3.789062 1.265625,5.953125 H 29.375 c -0.04297,-1.082031 -0.234375,-2.078125 -0.578125,-2.984375 -0.335937,-0.90625 -0.839844,-1.679688 -1.515625,-2.328125 -0.679688,-0.644531 -1.515625,-1.148437 -2.515625,-1.515625 -1,-0.363281 -2.171875,-0.546875 -3.515625,-0.546875 -1.242188,0 -2.339844,0.152344 -3.296875,0.453125 -0.960937,0.292969 -1.773437,0.710938 -2.4375,1.25 -0.65625,0.542969 -1.15625,1.183594 -1.5,1.921875 -0.34375,0.730469 -0.515625,1.527344 -0.515625,2.390625 0,0.90625 0.222656,1.726562 0.671875,2.453125 0.457031,0.730469 1.113281,1.386719 1.96875,1.96875 0.863281,0.585937 1.90625,1.121094 3.125,1.609375 1.226563,0.480469 2.613281,0.929688 4.15625,1.34375 2.207031,0.648438 4.238281,1.433594 6.09375,2.359375 1.851563,0.929687 3.445313,2.027344 4.78125,3.296875 1.332031,1.261719 2.367187,2.703125 3.109375,4.328125 0.738281,1.617187 1.109375,3.417969 1.109375,5.40625 0,2.117187 -0.429687,3.996094 -1.28125,5.640625 -0.84375,1.648438 -2.015625,3.039062 -3.515625,4.171875 -1.5,1.136719 -3.289062,1.996094 -5.359375,2.578125 -2.074219,0.582031 -4.335937,0.875 -6.78125,0.875 -1.523437,0 -3.042969,-0.140625 -4.5625,-0.421875 C 15.503906,-0.0664062 14.0625,-0.488281 12.6875,-1.0625 11.3125,-1.632812 10.023438,-2.347656 8.828125,-3.203125 7.640625,-4.066406 6.609375,-5.070312 5.734375,-6.21875 4.867188,-7.363281 4.1875,-8.664062 3.6875,-10.125 c -0.5,-1.457031 -0.75,-3.066406 -0.75,-4.828125 h 9.140625 c 0.03906,1.460937 0.289063,2.710937 0.75,3.75 0.46875,1.03125 1.113281,1.882813 1.9375,2.546875 C 15.597656,-8 16.59375,-7.515625 17.75,-7.203125 18.90625,-6.898438 20.179688,-6.75 21.578125,-6.75 c 1.226563,0 2.320313,-0.140625 3.28125,-0.421875 0.96875,-0.289063 1.78125,-0.6875 2.4375,-1.1875 0.664063,-0.507813 1.171875,-1.125 1.515625,-1.84375 0.351562,-0.71875 0.53125,-1.507813 0.53125,-2.375 z m 0,0" id="path191"/>
              </g>
           </g>
        </g>
        <g fill="#000000" fill-opacity="1" id="g205" transform="translate(-0.128906,-33.195314)">
           <g transform="translate(202.15996,84.092087)" id="g203">
              <g id="g201">
                 <path d="M 39.734375,-40.59375 H 24.875 V 0 H 15.546875 V -40.59375 H 0.890625 v -7.578125 h 38.84375 z m 0,0" id="path199"/>
              </g>
           </g>
        </g>
        <g fill="#000000" fill-opacity="1" id="g213" transform="translate(-0.128906,-33.195314)">
           <g transform="translate(242.81805,84.092087)" id="g211">
              <g id="g209">
                 <path d="M 33.984375,-21.109375 H 14.1875 v 13.59375 H 37.328125 V 0 H 4.859375 V -48.171875 H 37.21875 v 7.578125 H 14.1875 v 12.140625 h 19.796875 z m 0,0" id="path207"/>
              </g>
           </g>
        </g>
        <g fill="#000000" fill-opacity="1" id="g221" transform="translate(-0.128906,-33.195314)">
           <g transform="translate(283.47613,84.092087)" id="g219">
              <g id="g217">
                 <path d="M 20.6875,-18 H 13.625 V 0 H 4.328125 v -48.171875 h 16.15625 c 2.664063,0 5.078125,0.3125 7.234375,0.9375 2.164062,0.625 4.015625,1.546875 5.546875,2.765625 1.539063,1.210938 2.722656,2.71875 3.546875,4.53125 0.820312,1.8125 1.234375,3.90625 1.234375,6.28125 0,1.730469 -0.203125,3.28125 -0.609375,4.65625 -0.40625,1.375 -0.992188,2.609375 -1.75,3.703125 -0.761719,1.09375 -1.679688,2.054687 -2.75,2.875 -1.074219,0.8125 -2.273438,1.515625 -3.59375,2.109375 l 10.359375,19.875 V 0 H 29.75 Z m -7.0625,-7.546875 h 6.890625 c 2.625,0 4.644531,-0.664063 6.0625,-2 1.425781,-1.332031 2.140625,-3.15625 2.140625,-5.46875 0,-2.40625 -0.699219,-4.273437 -2.09375,-5.609375 -1.386719,-1.34375 -3.433594,-2.015625 -6.140625,-2.015625 H 13.625 Z m 0,0" id="path215"/>
              </g>
           </g>
        </g>
        <g clip-path="url(#4d08c4ce60)" id="g229" transform="translate(-0.128906,-33.195314)">
           <g mask="url(#9cbcf06372)" id="g227">
              <g transform="matrix(0.0816766,0,0,0.0816766,6.746475,59.053248)" id="g225">
                 <image x="0" y="0" width="469" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdUAAAHVCAIAAAAo2/agAAAABmJLR0QA/wD/AP+gvaeTAAAgAElEQVR4nO3dW5MiZ7ov9v+bCSSHqqwjdLcEElIfZgZ0mJHGs9TrCl04FGF7OxwzC+1YYV865mJ/Cr6DI/bFith3e8feFl62t8PeXnLEtvDNas2aw5I0nWjUBwkJpO6G6qqCKg4JZD6+SIqiqlt9ggIK/r8IKQqqK3lJMp98ePI9AERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERE+mZt0AmjlJpSwA6XQxn/9w1o2h55STVNUyDDvRqAAwGnbZjFcq8Uo5gaL3L3iOzy9+NsstJygABWSz+YZp7gU3xFWuo826WfQYPc3vC/X2vt6QulYqJAcnb04AZK18LR2NWjXvX+bTWeQAABmkUpZpNxKNSrkcbzTMYjHNs35+8JNYXtnsR1Y0VYylr37xVaTXCl9oyqrebQZm3S76UXVjLb5VKeQy1/6br1YuHQA4CKyG+23d55h2A4BuOweGWW+YBwervW/9nY3gwX9pZq289+f5fHYYkQE0DLMYSyPHIDAz3PXLKiepqpWuFW9vXjGcbheapmkAIAIAigfG3BEIBEop72cFJSIKSiBKKQVxoSkl4iodjqs0n9H/3f/0Vz/58C+mWV+zG/X6WlcCVf+Fe29d8iJyPp0FkESpiTAs1GoxFMCYME3c18tJkAEyePP+FwG3d/p3Xgim+aCUEhH1I1dE78Ma/vbUQ+8ZLzoLlOtomu46Sgs4PQC9gL8aiX0feTmDQgEZ5BDNVpFGBK0SksyLp4C7eBmlUjeLxfTlv7ljxOxQv/OE05vmx6Ox9Qn/YPiZPuavBFDwonog0m1KpKWHUMO+u75zJerFYu+7EUvGZ427dRm9994/JhKVb3pJN6YrMNtdNF7wHb2snrrEjj4cHAAaxFV2MND2BcNO29/uX967CyCfz8Y/KAMwyw0G4onjne7lpVhnWFBebB0NuF44PvXQe8YVCJS4SsQNtO21w4NAu2d2G7Xwdqn3ytW/uVW5nrhuflospuMflOMffJdK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" height="469" preserveAspectRatio="xMidYMid" id="image223"/>
              </g>
           </g>
        </g>
        <g clip-path="url(#f7f4597995)" id="g233" transform="translate(-0.128906,-33.195314)">
           <path fill="#3366cc" d="m 0.128906,43.617188 v 10.800781 c 0,0.175781 0.113282,0.335937 0.273438,0.386719 0.160156,0.0625 0.351562,0.01562 0.464844,-0.128907 1.375,-1.617187 3.148437,-2.882812 5.164062,-3.648437 v -7.429688 c 0,-2.480468 2.015625,-4.511718 4.511719,-4.511718 h 0.945312 C 13.96875,39.085938 16,41.101562 16,43.597656 v 13 c 0,2.480469 -2.015625,4.511719 -4.511719,4.511719 h -0.960937 c -0.191406,0 -0.367188,-0.01563 -0.542969,-0.03125 -0.511719,-0.06641 -1.023437,0.160156 -1.3125,0.589844 -0.238281,0.355469 -0.367187,0.769531 -0.367187,1.21875 v 2.703125 c 0,0.707031 0.527343,1.28125 1.230468,1.363281 C 9.855469,66.984375 10.191406,67 10.527344,67 h 0.945312 c 5.726563,0 10.398438,-4.675781 10.398438,-10.402344 v -13 c 0,-5.726562 -4.671875,-10.402344 -10.398438,-10.402344 H 10.527344 C 4.800781,33.210938 0.128906,37.886719 0.128906,43.617188 Z m 0,0" fill-opacity="1" fill-rule="nonzero" id="path231"/>
        </g>
        <g clip-path="url(#a362a29737)" id="g237" transform="translate(-0.128906,-33.195314)">
           <path fill="#00c4cc" d="m 10.527344,80.394531 c -2.480469,0 -4.511719,-2.015625 -4.511719,-4.511719 V 62.886719 c 0,-2.480469 2.015625,-4.515625 4.511719,-4.515625 h 0.945312 c 0.191406,0 0.367188,0.01953 0.542969,0.03516 0.511719,0.0625 1.023437,-0.160156 1.3125,-0.59375 0.238281,-0.351562 0.367187,-0.769531 0.367187,-1.214844 v -2.707031 c 0,-0.703125 -0.527343,-1.28125 -1.230468,-1.34375 C 12.144531,52.515625 11.808594,52.5 11.472656,52.5 H 10.527344 C 4.800781,52.5 0.128906,57.171875 0.128906,62.902344 v 12.996094 c 0,5.730468 4.671875,10.402343 10.398438,10.402343 h 0.945312 c 5.726563,0 10.398438,-4.671875 10.398438,-10.402343 V 65.09375 c 0,-0.175781 -0.113282,-0.335938 -0.273438,-0.382812 -0.160156,-0.0625 -0.351562,-0.01563 -0.460937,0.128906 -1.378907,1.617187 -3.152344,2.878906 -5.167969,3.648437 v 7.394531 c 0.01563,2.480469 -2,4.511719 -4.480469,4.511719 z m 0,0" fill-opacity="1" fill-rule="nonzero" id="path235"/>
        </g>
     </svg>
  )
}

