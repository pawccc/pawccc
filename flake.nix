{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShell = with pkgs; mkShell {
          nativeBuildInputs = [
            cargo
            rustc
            rustfmt
            rust-analyzer

            nodejs
            bun
            svelte-language-server
          ];

          buildInputs = [
            pkg-config
            openssl
            openssl.dev
          ];
        };
      }
    );
}
